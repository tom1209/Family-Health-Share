/**
 * Created by Tom on 2015-12-08.
 *
 * Family tree javascript file
 *
 * I used a jquery plugin to graphically show the information
 * http://www.jqueryrain.com/2013/03/jquery-horizontal-tree/
 * It uses ul lists to create a tree structure
 * Then populated it with family data
 */

//Plugin needs to be instantiated on render
Template.familyTree.rendered = function() {
    //Options for displaying family tree
    $('.tree').tree_structure({
        'add_option': false,
        'edit_option': false,
        'delete_option': false,
        'confirm_before_delete': true,
        'animate_option': false,
        'fullwidth_option': false,
        'align_option': 'center',
        'draggable_option': true
    });

    /*
     * This block is to get the current logged in user, and change their background in their family box
     */
    //Get the familyID of the logged in user
    var userId = Meteor.userId();
    var user = Meteor.users.findOne({_id: userId});
    var fullName = user.profile.firstName + " " + user.profile.lastName;

    $('div[data-user]').children().each(function(){
        if($(this).attr('id') == 'name')
        {
            var curName = $(this).text();
            if(curName == fullName)
            {
                $(this).parent('div').attr('id', 'loggedIn');
            }

        }

    })
};


//Populating list with family information
Template.familyTree.helpers({
    familyTree: function() {

        //Get the familyID of the logged in user
        var userId = Meteor.userId();
        var user = Meteor.users.findOne({_id: userId});

        var fullName = user.profile.firstName + " " +user.profile.lastName;
        var familyId = user.profile.family.familyId;

        var family = Families.findOne({'familyID': familyId});
        var familyMembers = family.familyMembers;

        //return Families.find({'familyID': familyId});
        return familyMembers;
    },

    //Onclick event to display user info
    'click #info': function(e){

    }
});

