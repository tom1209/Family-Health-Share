/**
 * Created by Tom on 2015-12-01.
 *
 * This is to hold the relations info of family member to family member
 */


Relations = new Mongo.Collection('relations');

//Insert a new document into collection
Meteor.methods({
    //Insert a relations document for a particular user
    'relationInsert' : function(relations){

        //Get relation value of all the relations on the page
        var user = Meteor.userId();
        var userRelations = {
            'id': user,
            'relations': relations
        }

        var relationInserted = Relations.insert(userRelations);

        return {
            _id: relationInserted
        }
    }
})