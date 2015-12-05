/**
 * Created by tom on 2015-10-04.
 * Will be used when a new user wants to edit profile information
 */

//When the template is rendered
Template.profileEdit.rendered = function(){
    //This is for the select picker
    $('.selectpicker').selectpicker({
        style: 'btn-default',
        size: 5
    });

    $('#DOB').datepicker();

};


Template.profileEdit.onCreated(function() {
    Session.set('profileEditSubmitErrors', {});
});


Template.profileEdit.helpers({
    //Error checking
    errorMessage: function(field) {
        return Session.get('profileEditSubmitErrors')[field];
    },
    errorClass: function (field) {
        return !!Session.get('profileEditSubmitErrors')[field] ? 'has-error' : '';
    }
});

Template.profileEdit.events({

    'submit form' : function(e) {
        e.preventDefault();

        var user = Meteor.userId();



        //Get form variables
        var userInfo = {
            email: e.target.email.value,
            firstName: e.target.fName.value,
            lastName: e.target.lName.value,
            middleName: e.target.mName.value,
            DOB: e.target.DOB.value,
            gender: e.target.selectGender.value
        };

        //validating user info
        var errors = {};

        if(!userInfo.email)
            errors.email = "Please enter your email address!";

        if(!userInfo.firstName)
            errors.firstName = "Please enter a first name";

        if(!userInfo.lastName)
            errors.lastName = "Please enter a last name";

        if(!userInfo.DOB)
            errors.DOB = "Please select a date of birth";

        //If any errors, display
        //If any errors, display them
        if(errors.email || errors.firstName || errors.lastName || errors.DOB)
            return Session.set('profileEditSubmitErrors', errors);


        //Update (Originally did this seperately for testing purpose, but will come back and group these into one update
        Meteor.users.update(user, {$set: {"profile.firstName": userInfo.firstName}});
        Meteor.users.update(user, {$set: {"profile.lastName": userInfo.lastName}});
        Meteor.users.update(user, {$set: {"profile.middleName": userInfo.middleName}});
        Meteor.users.update(user, {$set: {"profile.DOB": userInfo.DOB}});
        Meteor.users.update(user, {$set: {"profile.gender": userInfo.gender}});


        //Redirect back to profile page
        Router.go('/Profile');

    },

    '#click cancelEdit' : function(e){
        e.preventDefault();
        console.log('hm');
        Router.go('/Profile')
    }
});