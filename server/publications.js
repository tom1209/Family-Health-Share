/**
 * Created by Tom on 2015-09-28.
 * When auto-publish has been removed, this will be used to publish collections in the future
 */


//Publish health conditions collection

Meteor.publish('healthConditions', function(){
    return HealthConditions.find();
});

//Publish families collection
Meteor.publish('families', function(){
    return Families.find();
});

