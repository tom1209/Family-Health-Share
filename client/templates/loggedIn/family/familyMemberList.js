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
        //return Meteor.users.find({_id: userId}, {fields: {username: 1, profile: 1}});

        //Use that family ID to query the families collection and return the names of the individuals associated with that family
        var familyId = user.profile.family.familyId;
        console.log(familyId);

        return Families.find({ familyID : familyId}, {sort:{ _id : -1 }});
    }
});
