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
    familyTree: function () {

        //Get the familyID of the logged in user
        var userId = Meteor.userId();
        var user = Meteor.users.findOne({_id: userId});

        var familyId = user.profile.family.familyId;

        var family = Families.findOne({'familyID': familyId});
        var familyMembers = family.familyMembers;

        //return Families.find({'familyID': familyId});
        return familyMembers;
    }
});


//function to calculate the age from a birthday
//http://stackoverflow.com/questions/10008050/get-age-from-birthdate
//Used this stack overflow post
function getAge(dateString)
{
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
    {
        age--;
    }
    return age;
}


Template.familyTree.events({
    //Onclick event to display user info
    'click #userInfo': function(e){
        /*
            1) Get the name of the user who's info button was clicked
            2) Get the user information by referencing the user name
                -This might be tough. Two types of users, inactive and active
                   -inactive users have all their info stored in a family collection
                -For the active users must get the userID associated with the name, from the family collection
                -use that id to query the user's collection, and return the user information
            3) Display user info in modal window
         */

        //1)
        var curUserName = $(e.target).prev().html();

        //2)
        //first get the current family, searching through to see if the name matches.
        var curFam = Families.findOne({'familyMembers.name': curUserName});

        var userInfo = {};  //To hold user info to populate modal

        //Get current user
        var currentMembers = curFam.familyMembers;



        currentMembers.forEach(function(member){
            //If member has the inactiveMember status
            if(member.inactiveMember)
            {
                if(member.name == curUserName)
                {
                    userInfo = {
                        name: member.firstName + " " + member.middleName + " " + member.lastName,
                        email: member.email,
                        gender: member.gender,
                        birthday: member.DOB,
                        age: getAge(member.DOB)
                    }
                }
            }
            //These will be active members
            else
            {
                var id;
                //This will be a little trickier, because I need to get the info from the users collection
                if(member.name == curUserName)
                {
                    id = member.userId;
                }

                var user = Meteor.users.findOne({_id:id});
                //for email
                var email = user.emails;
                for(e in email)
                {
                    if(email.hasOwnProperty(e))
                    {
                        userInfo.email = email[e].address;
                    }
                }

                //inactive user info


                //active profile info
                userInfo.name = user.profile.firstName + " " + user.profile.middleName + " " + user.profile.lastName;
                userInfo.gender = user.profile.gender;
                userInfo.birthday = user.profile.DOB;
                userInfo.age = getAge(user.profile.DOB);
            }

        });


        //populating values on modal
        $("#userName").html(userInfo.name);
        $("#userEmail").html(userInfo.email);
        $("#userGender").html(userInfo.gender);
        $("#userDOB").html(userInfo.birthday);
        $("#userAge").html(userInfo.age);
    }
});

