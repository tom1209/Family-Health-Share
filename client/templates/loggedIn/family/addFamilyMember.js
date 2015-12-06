/**
 * Created by Tom on 2015-11-24.
 *
 * This page is the javascript for the addFamilyMember template. This template will be used when a current user wants to add a family member
 * that is either deceased, or just does not have an active account
 */

//This variable will be used to hold conditions added to this family member

//When the template is rendered
Template.addFamilyMember.rendered = function(){
    //This is for the select picker
    $('.selectpicker').selectpicker({
        style: 'btn-default',
        size: 5
    });

    $('#DOB').datepicker();
    $('#DOD').datepicker();

};


Template.addFamilyMember.onCreated(function() {
    Session.set('addFamilyMemberSubmitErrors', {});
});


//Helpers for addFamilyMember page.
Template.addFamilyMember.helpers({
    //This is for the autocomplete, I used a plugin from https://github.com/mizzao/meteor-autocomplete
    settings: function() {
        return {
            position: "bottom",
            limit: 10,
            rules: [
                {
                    // token: '',
                    collection: HealthConditions,
                    field: 'name',
                    matchAll: true,
                    sort:true,
                    template: Template.userPill
                }
            ]
        };
    },

    //Error checking
    errorMessage: function(field) {
        return Session.get('addFamilyMemberSubmitErrors')[field];
    },
    errorClass: function (field) {
        return !!Session.get('addFamilyMemberSubmitErrors')[field] ? 'has-error' : '';
    }

});



Template.addFamilyMember.events({
    //Adding a new family member
   'click #addNewFamilyMember' : function(e,t){

       //Getting user input
       var userInfo = {
           firstName : t.find('#fName').value,
           lastName : t.find('#lName').value,
           middleName : t.find('#mName').value,
           gender : t.find('#selectGender').value,
           DOB: t.find('#DOB').value,
           DOD: t.find('#DOD').value
       };

       //validating user info
       var errors = {};
       if(!userInfo.firstName)
        errors.firstName = "Please enter a first name";

       if(!userInfo.lastName)
           errors.lastName = "Please enter a last name";

       if(!userInfo.DOB)
           errors.DOB = "Please select a date of birth";

       //If any errors, display them
       if(errors.firstName || errors.lastName || errors.DOB)
           return Session.set('addFamilyMemberSubmitErrors', errors);

       //Getting the conditions for this family member
       var conditions = {
           name: $('#addedCondition'),
           notes: $('#notes')
       }

       //Add the user to the family collection. They will be added to a new field, called 'inActiveMembers' in the collection
       var user = Meteor.user();
       var userFamilyID = user.profile.family.familyId;
       var currentFamilyID = Families.findOne({familyID: userFamilyID});


       //Right now the best way I've found to update the family conditions list is just to create a new one with all the old conditions, plus the new one
       //And overwrite the existing list. May change that later, if I can find a better way
       var familyConditions = currentFamilyID.conditions;

       //Reusing this from the join user functionality, which can be found in noFamily.js
       /*var hasCondition = false;
       for(var c in conditions) {
           if (conditions.hasOwnProperty(c)) {
               for(var r in familyConditions) {
                   if (familyConditions.hasOwnProperty(r)) {
                       if (familyConditions[r].name == conditions[c].name)
                       {
                           familyConditions[r].count ++;
                           hasCondition = true;
                       }
                   }
               }
               if(!hasCondition)
               {
                   familyConditions.push({
                       name: conditions[c].name,
                       count: 1
                   })
               }
               hasCondition = false;
           }
       }*/

       //Update family information, first conditions, then inactiveMember
       Families.update(currentFamilyID._id, {$set: {conditions: familyConditions}}, function(error){
           if(error){
               throwError(error.reason);
           }
           else
           {
               console.log("Family conditions updated with inactive user conditions");
           }
       });

       //Update family information with new inactive user
       Families.update(currentFamilyID._id, {$set: {inactiveMembers: userInfo}}, function(error){
           if(error){
               throwError(error.reason);
           }
           else
           {
               console.log("Inactive family member added");
           }
       });

       var familyMember = {
           inactiveMember : true,
           addedBy: user._id,
           name: userInfo.firstName + " " + userInfo.lastName,
           submitted: new Date()
       };

       //Updating family document in Families collection with user info
       Families.update(currentFamilyID._id, {$addToSet: {familyMembers:familyMember}}, function(error) {
           if (error) {
               // display the error to the user
               throwError(error.reason);
           }
           else {
               location.reload();
           }
       });

   },

    //For adding health conditions when creating a new member profile
    'click #addMemberCondition' : function(e,t){
        e.preventDefault();

        //error checking the condition inputs
        //Get the value from the user input
        var healthCondition = t.find('#addCondition').value;
        var notes = t.find('#notes').value;

        //To hold errors if any
        var errors = {};

        //Checking user input for errors, putting in error array if found
        if (healthCondition == "")
            errors.healthCondition = "Please select a Health Condition";

        if (notes == "")
            errors.conditionNotes = "Please fill out a note to go with the health condition";

        //If errors, display the errors
        if (errors.healthCondition || errors.conditionNotes)
            return Session.set('addFamilyMemberSubmitErrors', errors);

        //Displaying the conditions in the form once they are added
        $('#healthConditions').append("<p id='addedCondition'>" + healthCondition + "</p>");
        $('#healthConditions').append("<p id='notes'>" + notes + "</p>");


        //Reset textbox and text area for health condition and notes
        $('#addCondition').val('');
        $('#notes').val('');

        //Push to condition variable which will hold the cons for use on the actual form submit above



    }
});