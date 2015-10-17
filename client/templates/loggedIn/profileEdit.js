/**
 * Created by tom on 2015-10-04.
 * Will be used when a new user wants to edit profile information
 */

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
            gender: e.target.gender.value
        };

        //Update
        Meteor.users.update(user, {$set: {"profile.firstName": userInfo.firstName}});
        Meteor.users.update(user, {$set: {"profile.lastName": userInfo.lastName}});
        Meteor.users.update(user, {$set: {"profile.middleName": userInfo.middleName}});
        Meteor.users.update(user, {$set: {"profile.DOB": userInfo.DOB}});
        Meteor.users.update(user, {$set: {"profile.gender": userInfo.gender}});


        //Redirect back to profile page
        Router.go('/Profile');

    }
});