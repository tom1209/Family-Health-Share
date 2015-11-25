/**
 * Created by tom on 2015-10-12.
 */

//This is for the add Health Conditions button click event
Template.profile.onCreated(function() {
    Session.set('conditionSubmitErrors', {});
});


//Helpers for profile page
Template.profile.helpers({
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
        return Session.get('conditionSubmitErrors')[field];
    },
    errorClass: function (field) {
        return !!Session.get('conditionSubmitErrors')[field] ? 'has-error' : '';
    }

});


Template.profile.events({
    //Display text area to add condition
    //If plus button is selected, verify that it is a valid selection, and health condition to user profile
    'click #addHealthCondition': function(e, t){
        //Get the value from the user input

        var healthCondition = t.find('#addCondition').value;
        var notes = t.find('#notes').value;



        //To hold errors if any
        var errors = {};

        //Checking user input for errors, putting in error array if found
        if (healthCondition == "")
            errors.healthCondition = "Please select a Health Condition";

        if (notes == "")
            errors.conditionNotes = "Please Fill out a note to go with the health condition";


        //If errors, display the errors
        if (errors.healthCondition || errors.conditionNotes)
            return Session.set('conditionSubmitErrors', errors);

        //Insert into the user profile
        var user = Meteor.userId();
        Meteor.users.update(user, {$push: {"profile.conditions": {$each: [{'name': healthCondition, 'notes': notes}]}}});

    },

    //Delete a condition
    'click #deleteCondition': function(e){
        var user = Meteor.userId();
        var condition = '';
        Meteor.users.update(user, {$pull: {'profile.conditions': {docId: this.docId}}});
    },

});



