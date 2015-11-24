/**
 * Created by Tom on 2015-11-01.
 * List of health conditions in the family
 */


Template.familyConditionsList.helpers({
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