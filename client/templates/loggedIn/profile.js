/**
 * Created by tom on 2015-10-12.
 */

//This is for the add Health Conditions button click event
Session.set('showHealthConditionText', false);

Template.profile.events({
    //Display text area to add condition
    'click #addHealthCondition': function(){
        Session.set('showHealthConditionText', true);
    },

    //Delete a condition
    'click #deleteCondition': function(e){
        var user = Meteor.userId();
        var condition = '';
        Meteor.users.update(user, {$pull: {'profile.conditions': this.name}});
    }
});

//Helpers for profile page
Template.profile.helpers({
    //This helper is to set a session that will hide and display the addHealthConditions input
    'showHealthConditionText' : function() {
     return Session.get('showHealthConditionText');
     }
});