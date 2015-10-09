/**
 * Created by Tom on 2015-09-28.
 * Since auto-publish has been removed, this will be used to publish collections in the future
 */

//Publish health conditions collection
Meteor.publish('healthConditions', function(){
    return HealthConditions.find();
});