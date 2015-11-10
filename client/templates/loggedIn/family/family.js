/**
 * Created by tom on 2015-10-29.
 * Javascript file for family page
 */

//When the page renders
Template.family.rendered = function(){

    Session.set('isFamilySet', false);

    //The reason I have to put everything in the autorun function is because the page is rendering before the user accounts
    //This means when I check the hasFamily property it returns undefined.
    this.autorun(function(e) {
        var user = Meteor.user();
        var userHasFamily = user && user.profile.hasFamily;

        if(userHasFamily)
        {
            if (userHasFamily === true)
            {
                Session.set('isFamilySet', true);
            }
        }
    });


}


Template.family.helpers({
    //Determine whether a user has registered with a family or not
    'isFamilySet': function() {
        return Session.get('isFamilySet');
    }
});

