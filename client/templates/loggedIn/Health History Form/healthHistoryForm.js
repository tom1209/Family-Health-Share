/**
 * Created by tom on 2015-10-12.
 * Javascript for family health history form
 */

Template.healthHistoryForm.events({
    //Printing the page
    'click #print': function (e, t) {
        e.preventDefault();
        window.print();
    },

    //save as pdf, this is using jsPDF library
    'click #savepdf': function(e,t){
        e.preventDefault();

        var doc = new jsPDF('p', 'pt', 'letter');

        var specialElementHandlers = {
            '#bypassme': function(element, renderer) {
                return true;
            }
        };

        doc.fromHTML($('#info').html(), 15, 15, {
            'width': 170,'elementHandlers': specialElementHandlers
        });
        doc.save('healthHistory.pdf');
    }
});