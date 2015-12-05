/**
 * Created by tom on 2015-11-16.
 * javascript file for the health history section of the user's health history form
 */

Template.healthHistory.helpers({
    //For conditions in a family
    'familyCondition': function(){
        //Get the familyID of the logged in user
        var userId = Meteor.userId();
        var user = Meteor.users.findOne({_id: userId});

        //Use the familyID in the user profile to query a family and get that families health conditions
        var familyId = user.profile.family.familyId;
        var family = Families.findOne({'familyID': familyId});
        var familyConditions = family.conditions;


        return familyConditions;
    },

});