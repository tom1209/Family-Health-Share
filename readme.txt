Family Health Share

-A social health history application for family members to share their family health information.

**General Meteor Info**

-.meteor folder is the meteor code
-The client folder holds data that is run only on the client side
-The server folder holds data that is run only on the server side
-Everything else is run in both client and server
-The public folder stores images, fonts, or static assets shared throughout the site on both client and server
-Files in the lib dir load first
-Files named main load last
-Everything else loads in alphabetical order
-Using meteor methods to allow users to securely update information on the server

***For error checking***
For the error checking I followed the tutorial in the book Discover Meteor by Tom Coleman and Sasha Greif
I based my own error checking and display of errors off of this

**NOTE** I put back on insecure to speed things up. Once I have all the functionality, I will take them back off

TODO (ShortTerm)
-Check momentum package for good animations
-Do CSS, add health conditions slide in and out instead of appearing and disappearing
-Allow user ot add notes to health conditions
-Salt and hash family password
-Add all users health conditions to that family
-Do not let users add the same health condition
-Admin functionality
-Family Health History Form completed

BUGS
-Login and Logout redirect, but this error Error invoking Method 'eventsOnLoggedIn': Internal server error [500]
-Bug on Cancel button in edit profile
-Extra empty user on family page




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