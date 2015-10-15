/**
 * Created by tom on 2015-10-12.
 * This is to store meteor methods. Mainly these are used for CRUD operations from the client side, for security,
 * to check against what is attempting to be updated
 */

//Method for updating user information
Meteor.methods({
    'updateUser' : function(userInfo) {
        var currentUserId = Meteor.userId();
        Meteor.users.update(currentUserId, {userInfo: {
            email: userInfo.email,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            middleName: userInfo.middleName,
            gender: userInfo.gender,
            DOB: userInfo.DOB
        }
        });
    }
});