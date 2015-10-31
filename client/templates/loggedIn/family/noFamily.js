/**
 * Created by tom on 2015-10-29.
 * For the 'no Family' template. If a user has not registered a family they will see this
 */

Template.noFamily.events({
    //On the create family click
    'click #createFamily': function (e) {
        //Setting this so the extra input for confirm password will be displayed
        Session.set('newFamily', true);
    },
    //On the Join Family click
    'click #joinFamily': function(e){
        Session.set('newFamily', false);
    }
});


//This helper is for the title of the form, which will either be create Family, or Join Family
Template.noFamily.helpers({
    'newFamily' : function(){
        return Session.get('newFamily');
    },

    newTitle: 'Create Family',
    joinTitle: 'Join a Family'
});