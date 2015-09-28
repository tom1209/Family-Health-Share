/**
 * Created by Tom on 28 Sept 2015
 * The router is used to map urls to templates. It is pointed to a layout template which uses {{>yeild}} to render
 * whatever template corresponds to the current route.
 */

//Used to point to layout template
Router.configure({
    layoutTemplate: 'layout'
});

//Routing to home page
Router.route('/', {name:'home'});

//Routing to about page
Router.route('/About', {name:'about'});