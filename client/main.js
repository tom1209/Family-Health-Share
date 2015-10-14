/**
 * Created by tom on 2015-10-08.
 */

//Subscribing to health conditions and families collections
Meteor.subscribe('healthConditions', 'families', 'userData');

//Initializing the hooks package that was downloaded
Meteor.startup(function(){
    Hooks.init();
});