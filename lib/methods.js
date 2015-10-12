/**
 * Created by tom on 2015-10-12.
 * This is to store meteor methods. Mainly these are used for CRUD operations from the client side, for security,
 * to check against what is attempting to be updated
 * The 'check' is a downloaded library, doing regular expression type of checks
 */

Meteor.methods({
   userUpdate: function(userInfo){
       check(Meteor.userId(), String);
       //Will come back here to do checks
       //check(userInfo, {

       //});
       var user = Meteor.user();
       //Putting a timestamp on when the user updated their info.
       var post = _.extend(userInfo, {
           userId: user._id,
           author: user.username,
           submitted: new Date()
       });
   }
});