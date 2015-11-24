/**
 * Created by Tom on 2015-11-01.
 * List of health conditions in the family
 */


Template.familyConditionsList.helpers({
    //For conditions in a family
    'familyConditions': function(){
        //Get the familyID of the logged in user
        var userId = Meteor.userId();
        var user = Meteor.users.findOne({_id: userId});

        var familyId = user.profile.family.familyId;
        var family = Families.findOne({'familyID': familyId});
        var familyConditions = family.conditions;

        //Return the family associated with tht ID, as well as the conditions
       // return Families.findOne({'familyID': familyId});
        return familyConditions;
    },

    'name': function(){
        //This is the current family conditions
        var result = _.values(this.name);

        //will append the current family member.text to end of result
        result.push(this.text);

        return result;
    },

    'count': function(){
        //This is the current family conditions
        var result = _.values(this.count);

        //will append the current family member.text to end of result
        result.push(this.text);

        return result;
    }
});