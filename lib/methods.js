/**
 * Created by tom on 2015-10-12.
 * This is to store meteor methods. Mainly these are used for CRUD operations from the client side, for security,
 * to ensure the client doesn't directly perform crud operations.
 * The 'check' is a downloaded library, doing regular expression type of checks
 */

Meteor.methods({
   userUpdate: function(userInfo){
       check(Meteor.userId(), String);
       //Will come back here to do checks 
       check(userInfo, {

       });
   }
});