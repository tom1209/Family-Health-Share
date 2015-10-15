/**
 * Created by Tom on 2015-09-28.
 * Since auto-publish has been removed, this will be used to publish collections in the future
 */

//Publish health conditions collection
Meteor.publish('healthConditions', function(){
    return HealthConditions.find();
});

//Publish families collection
Meteor.publish('families', function(){
    return Families.find();
});

//Publishing fields in the users collection
// server
Meteor.publish("userData", function () {
    if (this.userId) {
        return Meteor.users.find({_id: this.userId},
            {fields: {'profile': 1}});
    } else {
        this.ready();
    }
});

// client
