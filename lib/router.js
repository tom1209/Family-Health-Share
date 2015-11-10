/**
 * Created by Tom on 28 Sept 2015
 * The router is used to map urls to templates. It is pointed to a layout template which uses {{>yeild}} to render
 * whatever template corresponds to the current route.
 */

//Used to point to layout template
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading'
});

Meteor.users.allow({
    update: function(userId, doc, fieldNames, modifier) {
        return true;
    }
});

//Routes
Router.route('/', {name:'home'});

Router.route('/About', {name:'about'});

Router.route('/Family', {name:'family'});

Router.route('/Profile', {name: 'profile'});

Router.route('/EditProfile', {name:'profileEdit'});

Router.route('/Login', {name:'login'});

Router.route('/HealthHistoryForm', {name:'healthHistoryForm'});

//Checking to see if user has valid login
var requireLogin = function() {
    if (! Meteor.user())
    {
        //Logging in function so there isn't a brief flash of "access denied" if there is a delay with logging in
        if(Meteor.loggingIn())
        {
            this.render(this.loading);
        }
        else
        {
            this.render('accessDenied');
        }
    }
    else
    {
        this.next();
    }
};

//Redirect on logout to home
Hooks.onLoggedOut = function (userId) {
    Router.go('/');
};

//Redirect to profile page when logged in


//Login required to access family page
Router.onBeforeAction(
    requireLogin, {only: 'family', only: 'profile', only: 'profileEdit', only:'healthHistoryForm'}
);
