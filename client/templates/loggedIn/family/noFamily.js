/**
 * Created by tom on 2015-10-29.
 * For the 'no Family' template. If a user has not registered a family they will see this
 */


Template.noFamily.onCreated(function() {
    Session.set('familySubmitErrors', {});
});

//This helper is for the title of the form, which will either be create Family, or Join Family
Template.noFamily.helpers({

    //Error checking
    errorMessage: function(field) {
        return Session.get('familySubmitErrors')[field];
    },
    errorClass: function (field) {
        return !!Session.get('familySubmitErrors')[field] ? 'has-error' : '';
    }
});

Template.noFamily.events({

    ////////////Insert family information into the database, This is for creating family from scratch//////////
    'click #addFamily' : function(e,t) {
        e.preventDefault();

        //Get form input
        var family = {
            familyID : t.find('#familyID').value,
            familyName: t.find('#familyName').value,
            familyPassword: t.find('#familyPassword').value,
            confirmPassword: t.find('#confirmPassword').value
        };

        //Validate
        var errors = validateNewFamily(family);
        if (errors.familyID || errors.familyName || errors.familyPassword ||errors.confirmPassword ||errors.passwordMismatch)
            return Session.set('familySubmitErrors', errors);


        Meteor.call('familyInsert', family, function(error,result){
            // if the familyID entered already exists
            if (error) {
                throwError(error.reason);
            }
            else
            {
                if (result.familyExists)
                {
                    alert('This familyID is taken');
                }
                else
                {
                    //Now we update the user profile to set the family in their profile
                    Meteor.users.update({
                            _id: Meteor.userId()
                        },
                        {
                            $set: {
                                'profile.hasFamily' : true,
                                'profile.family' : {
                                    'familyName' : family.familyName,
                                    'familyId' : family.familyID
                                }
                            }
                        });

                    //Reload the family page after family has been set, which will show family info instead of selecting a family info
                    location.reload();
                }
            }
        });

    },


    //////////This is for joining a family that already exists in the database//////////
    /*
        NOTE: I updated here, but used a meteor method to insert. Reason being I was having some strange error.
        I'll leave it like this for now, and change it over later.
     */
    'click #joinFamily' : function(e,t) {
        e.preventDefault();

        //Get form input
        var family = {
            familyID : t.find('#familyJoinID').value,
            familyPassword: t.find('#familyJoinPassword').value,
            familyName : t.find('#familyJoinName').value
        };

        //Family user is trying to join
        var familyWithSameId = Families.findOne({familyID: family.familyID});

        //setting user info to add to families collection
        var user = Meteor.user();
        var familyMember = {
                userId: user._id,
                name: user.profile.firstName + " " + user.profile.lastName,
                submitted: new Date()
            };

        //Checking for errors and displaying if necessary
        var errors = validateNewFamily(family);
        if (errors.familyID || errors.familyPassword || errors.familyName)
            return Session.set('familySubmitErrors', errors);


        //Checking to see if FamilyID the user is trying to join exists, if so updating both the Family and user collection
        if(familyWithSameId)
        {
            //Getting the existing family health conditions
            var familyConditions = familyWithSameId.conditions;
            //Getting the health conditions from a user profile
            var userConditions = user.profile.conditions;


            //If the user condition already exists in the family condition list, add one to the count
            //Basically, because we are iterating through object literals, we have to check if that property exists which is the .hasOwnProperty
            var hasCondition = false;
            for(var c in userConditions) {
                if (userConditions.hasOwnProperty(c)) {
                    for(var r in familyConditions) {
                        if (familyConditions.hasOwnProperty(r)) {
                            if (familyConditions[r].name == userConditions[c].name)
                            {
                                familyConditions[r].count ++;
                                hasCondition = true;
                            }
                        }
                    }
                    if(!hasCondition)
                    {
                        familyConditions.push({
                            name: userConditions[c].name,
                            count: 1
                        })
                    }
                    hasCondition = false;
                }
            }

            //Just testing to make sure I have the correct number of conditions after the join
            /*var result = 0;
            for(var r in familyConditions) {
                if (familyConditions.hasOwnProperty(r)) {
                    // or Object.prototype.hasOwnProperty.call(obj, prop)
                    result++;
                }
            }
            alert(result);*/

            //Update family with new list of conditions
            Families.update(familyWithSameId._id, {$set: {conditions: familyConditions}}, function(error){
                if(error){
                    throwError(error.reason);
                }
                else{
                    console.log("Family conditions updated");
                }
            });


            //Updating family document in Families collection with user info
            Families.update(familyWithSameId._id, {$addToSet: {familyMembers:familyMember}}, function(error) {
                if (error) {
                    // display the error to the user
                    throwError(error.reason);
                } else {
                    //Now we update the user profile to set the family in their profile
                    Meteor.users.update({
                            _id: Meteor.userId()
                        },
                        {
                            $set: {
                                'profile.hasFamily' : true,
                                'profile.family' : {
                                    'familyName' :family.familyName,
                                    'familyId' : family.familyID
                                }
                            }
                        });
                    location.reload();
                }
            });
        }
        else
        {
            alert('There is no family with that ID that currently exists');
        }

    }

});
