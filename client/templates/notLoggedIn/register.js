/**
 * Created by tom on 2015-10-04.
 * Will be used when a new user wants to register an account
 */

Template.register.events({
    'submit form':function(e){
        e.preventDefault();
        console.log("register firing!");
        //Registration logic will go here
    }
});