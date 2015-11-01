/**
 * Created by tom on 2015-10-29.
 * For the 'no Family' template. If a user has not registered a family they will see this
 */

Template.noFamily.events({
    //On the create family click
    'click #createFamily': function (e) {
        //Setting this so the extra input for confirm password will be displayed
        Session.set('newFamily', true);
    },
    //On the Join Family click
    'click #joinFamily': function(e){
        Session.set('newFamily', false);
    },

    //Insert family information into the database
    'click #addFamily' : function(e,t) {
        e.preventDefault();

        /////This is for creating a family/////

        //Get form input
        var password =  t.find('#familyPassword').value;
        var confirmPassword = t.find('#confirmPassword').value;
        var familyID = t.find('#familyID').value;
        var familyName = t.find('#familyName').value;

        //Validate family password
        if (password != confirmPassword)
        {
            Session.set('passwordMismatch', true);

        }
        else
        {
            Session.set('passwordMismatch', false);

            //Insert
            var user = Meteor.userId();
        }
    }
});


//This helper is for the title of the form, which will either be create Family, or Join Family
Template.noFamily.helpers({
    'newFamily' : function(){
        return Session.get('newFamily');
    },

    'passwordMismatch' : function(){
        return Session.get('passwordMismatch');
    },

    'errorMessage' : function(){
        errorMessage = "Passwords do not match";
        return errorMessage;
    },

    newTitle: 'Create Family',
    joinTitle: 'Join a Family'
});