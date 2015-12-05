/**
 * Created by Tom on 2015-11-01.
 * Display the list of family members
 */


//On page rendered, in order to load the relations
Template.familyMemberList.rendered = function(){

    //Try to find a document in the relations collection that contains the currentuserID
    var userId = Meteor.userId();
    var relationDoc = Relations.findOne({'id': userId});


    //If there is a document that exists, load the values into the select boxes, else insert a new document into the collection
    if(relationDoc != null)
    {
        console.log("Not null");
        //Update with the current relations, to display in the family members table

        var relationInfo = relationDoc.relations;

        //If the name is equal to the name on the table, to do this, I iterate through the tables
        $("#familyMemberTable tr").each(function () {
            var $this = $(this);
            var td = $this.children("td");
            var name = td.eq(0).text();
            //console.log(nameInCollection);
            console.log(name);

            //for each relation in this document
            for(r in relationInfo)
            {
                if(relationInfo.hasOwnProperty(r))
                {
                    var nameInCollection = relationInfo[r].name;
                    console.log(nameInCollection);
                    if( name == nameInCollection)
                    {
                        var rel = relationInfo[r].relation;

                        if(rel != "")
                        {
                            $('.selectpicker').val(rel);
                        }

                    }

                }
            }

        });

    }
    else
    {
        console.log("Null");
        //Get all family members with the user's family. Then insert them into the relations collection with the userID, add relations on update
        var user = Meteor.users.findOne({_id: userId});
        var familyId = user.profile.family.familyId;

        var family = Families.findOne({'familyID': familyId});
        var familyMembers = family.familyMembers;

        var relations = [];

        //Putting names into relations array
        for(var m in familyMembers)
        {
            if(familyMembers.hasOwnProperty(m))
            {
                var name = familyMembers[m].name;
                var relation = "Self";
                var r = {
                    'name': name,
                    'relation': relation
                };

                relations.push(r);
            }
        }


        //calling meteor insert method
        Meteor.call('relationInsert', relations);

    }
};

//For the family specific to the user to display on the family members list
Template.familyMemberList.helpers({
    familyMembers: function() {

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


Template.familyMemberList.events({
    //On select box change, update the database with the relation information (Hey this rhymes)
    'change select': function(e,t){
        //get table info
        var fm = this.name;
        var relation = $(e.target).val();

        //Update relations document
        var userId = Meteor.userId();
        var relationDoc = Relations.findOne({'id': userId});

        //Families.update(familyWithSameId._id, {$set: {conditions: familyConditions}}
        Relations.update(relationDoc._id, {addToSet: {relations: {'name': fm, 'relation':relation}}});
    }
});
