Family Health Share

-A social health history application for family members to share their family health information.

**General Meteor Info**

-.meteor folder is the meteor code
-The client folder holds data that is run only on the client side
-The server folder holds data that is run only on the server side
-Everything else is run in both client and server
-The public folder stores images, fonts, or static assets shared throughout the site on both client and server
-Files in the lib dir load first
-Files named main loads last
-Everything else loads in alphabetical order
-Using meteor methods to allow users to securely update information on the server, specifically good for working with collections

***For error checking***
For the error checking I followed the tutorial in the book Discover Meteor by Tom Coleman and Sasha Greif
I based my own error checking and display of errors off of this

**NOTE** I put back on insecure to speed things up. Once I have all the functionality, I will take it back off

TODO
**Low Priority**
-Check momentum package for good animations
-Do CSS, add health conditions slide in and out instead of appearing and disappearing

**High Priority**
-Salt and hash family password
-Do not let users add the same health condition
-Admin functionality
-Remove family from profile
-Family needs to dynamically update user info and conditions when users change their information

-Possibly displaying info on different family members health conditions notes, on family page
-Login and Logout redirect, but this error Error invoking Method 'eventsOnLoggedIn': Internal server error [500]
-'Add New User' button on family page will add a user, but will only add the first word of a condition with more than 1 name
-Sort family conditions by count
-Only highlights condition on family page with highest count, not all that have a count of over 5
-Need to add conditions to inactive users, so if they are removed I can remove those conditions from the family document


**Where I got description for health information**
**Eventually this information will all come from the same standard database**

Alzheimer's Disease - http://www.alzfdn.org/AboutAlzheimers/definition.html
Dementia - http://www.alzheimers.org.uk/site/scripts/documents.php?categoryID=200360
Arthritis - http://www.cdc.gov/arthritis/basics/general.htm
Asthma - http://www.nhlbi.nih.gov/health/health-topics/topics/asthma
Cancer - http://medical-dictionary.thefreedictionary.com/cancer
Depression - http://www.mayoclinic.org/diseases-conditions/depression/basics/definition/con-20032977
Diabetes - http://care.diabetesjournals.org/content/27/suppl_1/s5.full
Heart Disease - http://www.medicinenet.com/script/main/art.asp?articlekey=31193
High Cholesterol - http://www.mayoclinic.org/diseases-conditions/high-blood-cholesterol/basics/definition/con-20020865
High Blood Pressure - http://www.nhlbi.nih.gov/health/health-topics/topics/hbp
Pregnancy Loss/Birth Defects - http://www.merckmanuals.com/home/women-s-health-issues/detection-of-genetic-disorders/overview-of-genetic-disorders