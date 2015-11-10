/**
 * Created by Tom on 2015-11-01.
 * Display the list of family members
 */

Template.familyMemberList.helpers({
    familyMembers: function() {
        return Families.find({}, {sort:{ _id : -1 }});
    }
});