/**
 * Created by Tom on 2015-10-11.
 * Collection for the different families.
 */

Families = new Mongo.Collection('families');

//insecure package needs to be removed, then i can comment out and fix this.

Families.allow({
    insert: function(userId) { return userId},
    update: function(userId) { return userId},
    remove: function(userId) { return userId}
});


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
};


//To insert a new family, and validate
Meteor.methods({
    //Called when creating a new family
    familyInsert: function(familyAttributes) {

        //Checking variables of user inputs, check is an extra built in function
        check(this.userId, String);
        check(familyAttributes, {
            familyID: String,
            familyName: String,
            familyPassword: String,
            confirmPassword: String
        });


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
            familyMembers : [{
                    userId: user._id,
                    name: user.profile.firstName + " " + user.profile.lastName,
                    submitted: new Date()}
            ]
        });

        //Actual insert into the database
        var familyId = Families.insert(familyAttributes);

        return {
            _id: familyId
        };
    },

});
