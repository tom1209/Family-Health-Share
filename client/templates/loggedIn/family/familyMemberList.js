/**
 * Created by Tom on 2015-11-01.
 * Display the list of family members
 */

//For the family specific to the user to display on the family members list
Template.familyMemberList.helpers({
    familyMembers: function() {

        //Get the familyID of the logged in user
        var userId = Meteor.userId();
        var user = Meteor.users.findOne({_id: userId});

        var familyId = user.profile.family.familyId;

        var family = Families.findOne({'familyID': familyId});
        var familyMembers = family.familyMembers;

        //return Families.find({'familyID': familyId});
        return familyMembers;
    }
});
