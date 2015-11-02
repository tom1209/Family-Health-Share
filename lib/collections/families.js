/**
 * Created by Tom on 2015-10-11.
 * Collection for the different families.
 */

Families = new Mongo.Collection('families');


//To validate the user input when they are creating a new family
validateNewFamily = function (family) {
    var errors = {};
    if (!family.familyID)
        errors.familyID = "Please fill in a familyID";
    if (!family.familyName)
        errors.familyName =  "Please fill in a familyName";
    if (!family.familyPassword)
        errors.familyPassword =  "Please fill in a password";
    if(familyPassword != confirmPassword)
        errors.passwordMismatch = "Your passwords do not match!";
    return errors;
}

//To insert a new family, and validate
Meteor.methods({
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

        if (errors.familyID || errors.familyName || errors.familyPassword || errors.passwordMismatch)
            throw new Meteor.Error('invalid-family', "Something went wrong when trying to create a new family");

        //This is to check whether there is an existing familyID in the database
        var familyWithSameId = Families.findOne({familyID: familyAttributes.familyID});
        if (familyWithSameId) {
            return {
                familyExists: true,
                _id: familyWithSameId._id
            }
        }

        var user = Meteor.user();

        //this gets the information of who submitted on what date
        var family = _.extend(familyAttributes, {
            userId: user._id,
            author: user.email,
            submitted: new Date()
        });

        var familyId = Families.insert(family);

        return {
            _id: familyId
        };
    }
});