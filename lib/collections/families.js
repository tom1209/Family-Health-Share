/**
 * Created by Tom on 2015-10-11.
 * Collection for the different families.
 */

Families = new Mongo.Collection('families');

//insecure package needs to be removed, then i can comment out and fix this.
/*
Families.allow({
    insert: function(userId) { return userId},
    update: function(userId) { return userId},
    remove: function(userId) { return userId}
});*/


//To validate the user input when they are creating a new family

validateNewFamily = function (family) {
    var errors = {};
    if (!family.familyID)
        errors.familyID = "Please fill in a familyID";
    if (!family.familyName)
        errors.familyName =  "Please fill in a familyName";
    if (!family.familyPassword)
        errors.familyPassword =  "Please fill in a password";
    if(!family.confirmPassword)
        errors.confirmPassword = "Please confirm your family password";
    if(family.familyPassword != family.confirmPassword)
        errors.passwordMismatch = "Your passwords do not match!";
    return errors;
}

//To insert a new family, and validate
Meteor.methods({
    //Called when creating a new family
    familyInsert: function(familyAttributes) {

        check(this.userId, String);
        check(familyAttributes, {
            familyID: String,
            familyName: String,
            familyPassword: String,
            confirmPassword: String
        });

        //If any errors, putting them in errors variable
        var errors = validateNewFamily(familyAttributes);
        if (errors.familyID)
            throw new Meteor.Error('invalid-familyID', "Something went wrong when trying to create a new family, family ID invalid");
        if (errors.familyName)
            throw new Meteor.Error('invalid-familyName', "Something went wrong when trying to create a new family, family Name is invalid");
        if (errors.familyPassword)
            throw new Meteor.Error('invalid-familyPassword', "Something went wrong when trying to create a new family, family password is invalid");
        if(errors.confirmPassword)
            throw new Meteor.Error('invalid-password', 'Confirmation password is invalid. ')
        if (errors.passwordMismatch)
            throw new Meteor.Error('invalid-passwordMismatch', "Something went wrong when trying to create a new family, passwords do not match");

        //This is to check whether there is an existing familyID in the database
        var familyWithSameId = Families.findOne({familyID: familyAttributes.familyID});
        if (familyWithSameId) {
            return {
                familyExists: true,
                _id: familyWithSameId._id
            }
        }
        var user = Meteor.user();

        //this gets the information of what user is in the family
        var family = _.extend(familyAttributes, {
            familyMembers : {
                    member : {
                    userId: user._id,
                    name: user.profile.firstName + " " + user.profile.lastName,
                    submitted: new Date()}}
        });

        //Actual insert into the database
        var familyId = Families.insert(familyAttributes);

        return {
            _id: familyId
        };
    },


    //Called when joining a new family, instead of creating
    familyJoin : function(familyAttributes) {

    }

});
