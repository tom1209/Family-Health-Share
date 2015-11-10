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


    //Insert family information into the database
    'click #addFamily' : function(e,t) {
        e.preventDefault();
        /////This is for creating a family/////

        //Get form input
        var family = {
            familyID : t.find('#familyID').value,
            //familyID: $(e.target).find('[name=familyID]').val(),
            familyName: t.find('#familyName').value,
            familyPassword: t.find('#familyPassword').value,
            confirmPassword: t.find('#confirmPassword').value
        };

        Meteor.call('familyInsert', family, function(error,result){
            Router.go('family');
        });


        //Inserting the data, using the familyInsert method we defined in the families.js collecton file
        Meteor.call('familyInsert', family, function(error, result) {
            // display the error to the user and abort
            if (error)
                return throwError(error.reason);

            // if the familyID entered already exists
            //if (result.familyExists)
            //    alert('This familyID is taken');


        });

        //Now we update the user profile to set the family in their profile
        Meteor.users.update({
            _id: Meteor.userId()
        }, {
            $set: {
                'profile.hasFamily' : true
            }
        });

        //Close the modal window
        location.reload();
    },

    //On the create family click
    'click #createFamily': function (e) {
        //Setting this so the extra input for confirm password will be displayed
        Session.set('newFamily', true);
    },
    //On the Join Family click
    'click #joinFamily': function(e){
        Session.set('newFamily', false);
    }

});
