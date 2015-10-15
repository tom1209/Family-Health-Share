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


TODO (ShortTerm)
-Families collection
-Update user profile
-Look up collection helpers and collection hooks
-Check momentum package for good animations


BUGS
-Login and Logout redirect, but this error Error invoking Method 'eventsOnLoggedIn': Internal server error [500]

-Once user Accounts is fully created I can add the family aspect. 

DONE
-Home Page, About Page, Login Page, Register Page, Family Page 
-Basic Setup
-User Login
-Health Conditions collection

-Created Develop branch


**Where I got description for health information**
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