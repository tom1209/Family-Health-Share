/**
 * Created by tom on 2015-10-29.
 * Javascript file for family page
 */

var user = Meteor.userId();
var hasFamily = user.profile.hasFamily;
if (hasFamily == true)
    Session.set('hasFamily', true);
else
    Session.set('hasFamily', false);

Template.family.helpers({
    //Determine whether a user has registered with a family or not
    'hasFamily': function() {
        return Session.get('hasFamily');
    }
});