/**
 * Created by tom on 2015-10-17.
 * This is for the adding health condition template. The idea is autocomplete search with all the health conditions
 */


Template.addHealthConditions.events({
    //If cancel button hit, reset health condition input value and hide
    'click #cancel': function(e){
        Session.set('showHealthConditionText', false);
    },

    //If plus button is selected, verify that it is a valid selection, and health condition to user profile
    'click #add': function(e){

    }
});


//This is for the autocomplete, I used a plugin from https://github.com/mizzao/meteor-autocomplete
Template.addHealthConditions.helpers({
    settings: function() {
        return {
            position: "bottom",
            limit: 5,
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
    }
});




