/**
 * Created by Tom on 2015-10-04.
 * This will handle the login functionality
 *
 */

Template.login.events({

    //e is a variable for events, t is a variable for template
    'submit #login-form' : function(e, t){
        e.preventDefault();

        //Username and password values
        var email = t.find('#login-email').value;
        var password = t.find('#login-password').value;

        //Trim and validate here



        //Attempt to login, if successful go to family page
        Meteor.loginWithPassword(email, password, function(error){
            if(Meter.user())
            {
                Router.go('family');
            }
            else
            {
                var message = "There is a problem: <strong>" + error.reason + "</strong>";
                template.find('#form-messages').html(message);
            }
            return;
        });

        return false;
    }
});

