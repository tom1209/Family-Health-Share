/**
 * Created by tom on 2015-10-29.
 * For the 'no Family' template. If a user has not registered a family they will see this
 */


Template.noFamily.onCreated(function() {
    Session.set('familySubmitErrors', {});
});

//This helper is for the title of the form, which will either be create Family, or Join Family
Template.noFamily.helpers({
    'newFamily' : function(){
        return Session.get('newFamily');
    },
    newTitle: 'Create Family',
    joinTitle: 'Join a Family',


    //Error checking
    errorMessage: function(field) {
        return Session.get('familySubmitErrors')[field];
    },
    errorClass: function (field) {
        return !!Session.get('familySubmitErrors')[field] ? 'has-error' : '';
    }
});

Template.noFamily.events({


    ////////////Insert family information into the database, This is for creating from scratch//////////
    'click #addFamily' : function(e,t) {
        e.preventDefault();

        //Get form input
        var family = {
            familyID : t.find('#familyID').value,
            familyName: t.find('#familyName').value,
            familyPassword: t.find('#familyPassword').value,
            confirmPassword: t.find('#confirmPassword').value
        };

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
    'click #joinFamily' : function(e,t) {
        e.preventDefault();

        //Get form input
        var family = {
            familyID : t.find('#familyID').value,
            familyPassword: t.find('#familyPassword').value
        };
        console.log(family.familyID);

        Meteor.call('familyJoin', family, function(error,result){

        });
    },


});
