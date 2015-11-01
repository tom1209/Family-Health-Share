/**
 * Created by tom on 2015-10-29.
 * Javascript file for family page
 */

Template.family.helpers({
    //Determine whether a user has registered with a family or not
    'hasFamily': function(){
        return Meteor.userId().profile.hasFamily;
    }
});