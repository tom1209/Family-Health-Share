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

                    location.reload();
                }
            }
        });

    },


    //////////This is for joining a family that already exists in the database//////////
    /*
        NOTE: I updated the collection here, but used a meteor method to insert above, to try out the different ways to interact with a database
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
        var joinFamInfo = {
            familyName : familyWithSameId.familyName,
            familyPassword : familyWithSameId.familyPassword
        };

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

            //Display any family mismatch on name or password, errors
            errors = checkFamily(family, joinFamInfo);
            if(errors.familyPassword || errors.familyName)
                return Session.set('familySubmitErrors', errors);




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
            Families.update(familyWithSameId._id, {$push: {familyMembers:familyMember}}, function(error) {
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
