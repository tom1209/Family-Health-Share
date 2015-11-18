/**
 * Created by tom on 2015-11-16.
 * Information template javascript file on the user's health history form page
 */


//When the template is rendered
Template.information.rendered = function(){
    //This is for the select picker
    $('.selectpicker').selectpicker({
        style: 'btn-default',
        size: 5
    });

};
