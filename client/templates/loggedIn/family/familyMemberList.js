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

        return Families.find({'familyID': familyId});
    },

    //To get the specific name of family members in a family
    name: function() {
        //This is the current familyID, familyMembers attribute
        var result = _.values(this.familyMembers);

        //will append the current family member.text to end of result
        result.push(this.text);


        return result;
    }
});
