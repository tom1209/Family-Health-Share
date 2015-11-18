/**
 * Created by tom on 2015-11-16.
 * For the relations template
 */

//When the template is rendered
Template.relation.rendered = function(){
    //This is for the select picker
    $('.selectpicker').selectpicker({
        style: 'btn-default',
        size: 'auto',
        dropupAuto: true
    });

};
