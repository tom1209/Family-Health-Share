/**
 * Created by tom on 2015-10-14.
 * general code to run on server
 */
//Error happening on hooks library, known bug, this is a fix for now
Meteor.methods({
    eventsOnHooksInit : function(){}
});

//On account creation, add the 'hasFamily' document to the account and set to false

Accounts.onCreateUser(function(options, user){
    profile = {
        hasFamily: false
    };

    user.profile = profile;

    return user;
});