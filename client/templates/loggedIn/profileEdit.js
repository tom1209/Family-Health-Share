/**
 * Created by tom on 2015-10-04.
 * Will be used when a new user wants to edit profile information
 */

Template.profileEdit.events({

    'submit form' : function(e) {
        e.preventDefault();

        var currentUserId = Meteor.userId();

        //To keep the username

        //Get form variables
        var userInfo = {
            email: e.target.email.value,
            firstName: e.target.fName.value,
            lastName: e.target.lName.value,
            middleName: e.target.mName.value,
            DOB: e.target.DOB.value,
            gender: e.target.gender.value
        };

        //Calling Meteor Method used to update. This is so the insert isn't done directly from the client
        Meteor.users.update(Meteor.userId(), {$set: {profile: userInfo}});
       /* Meteor.call('userUpdate', userInfo, function(error, results){
            if (error)
            {
                console.log("Unable to update: " + error);
            }
            else
            {
                Router.go('profile', {_id: currentUserId});
                console.log("Updated Succesfully");
                console.log(currentUserId + " " + userInfo.email);
            }
        });*/
    }
});