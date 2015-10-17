/**
 * Created by tom on 2015-10-12.
 */

//This is for the add Health Conditions button click event
Session.set('showHealthConditionText', false);

Template.profile.events({
    'click #addHealthCondition': function(){
        Session.set('showHealthConditionText', true);
    }
});

Template.profile.helpers({
    'showHealthConditionText' : function() {
     return Session.get('showHealthConditionText');
     }
});