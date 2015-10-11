/**
 * Created by Tom on 28 Sept 2015
 * The router is used to map urls to templates. It is pointed to a layout template which uses {{>yeild}} to render
 * whatever template corresponds to the current route.
 */

//Used to point to layout template
Router.configure({
    layoutTemplate: 'layout'
});

//Routes
Router.route('/', {name:'home'});

Router.route('/About', {name:'about'});

Router.route('/Family', {name:'family'});

Router.route('/Profile', {name:'profile'});

Router.route('/Login', {name:'login'});

//When a user is logged in they are able to see family pages
var requireLogin = function() {
    if (! Meteor.user())
    {
        //Logging in function so there isn't a brief flash of "access denied" if there is a delay with logging in
        if(Metoer.loggingIn())
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
}

//Login required to access family page
Router.onBeforeAction(requireLogin, {only: 'family', only: 'profile'});
