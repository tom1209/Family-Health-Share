/**
 * Created by Tom on 2015-11-01.
 * Display the list of family members
 */

Session.set('userFamilyId', null);

Template.familyMemberList.rendered = function(){
    var currentUserId = this._id;
    Session.set('userFamilyId', currentUserId.profile.family.familyID);
}

//For the family specific to the user to display on the family members list
Template.familyMemberList.helpers({
    familyMembers: function() {
        return Families.find({ familyID : Session.get(userFamilyId)}, {sort:{ _id : -1 }});
    }
});
