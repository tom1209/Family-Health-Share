/**
 * Created by tom on 2015-11-18.
 * For error checking on forms
 *
 * For the error checking I followed the tutorial in the book Discover Meteor by Tom Coleman and Sasha Greif
 * I based my own error checking and display off this
 */

//local collection only
Errors = new Mongo.Collection(null);

throwError = function(message) {
    Errors.insert({message: message});
};

Template.errors.helpers({
    errors: function() {
        return Errors.find();
    }
});

Template.error.onRendered(function() {
    var error = this.data;
    Meteor.setTimeout(function () {
        Errors.remove(error._id);
    }, 3000);
});