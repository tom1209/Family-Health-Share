/**
 * Created by Tom on 2015-10-08.
 * This is the collection (Table) for the health condition information
 * Links to where I got the description in readme
 */

HealthConditions = new Mongo.Collection('healthConditions');

HealthConditions.insert({
    Condition :  {name : "Alzheimer's Disease",
                  Description : "Alzheimer's disease is a progressive, degenerative disorder that attacks the brain's nerve cells," +
                  " or neurons, resulting in loss of memory, thinking and language skills, and behavioral changes"},

    Condition : { name :"Dementia",
                  Description: "The word dementia describes a set of symptoms that may include memory loss and difficulties with " +
                  "thinking, problem-solving or language. Dementia is caused when the brain is damaged by diseases, " +
                  "such as Alzheimer's disease or a series of strokes"},

    Condition : { name :"Arthritis",
                  Description: "rheumatic diseases and conditions that affect joints, the tissues which surround the joint and" +
                  " other connective tissue."},

    Condition : { name: "Asthma",
                  Description: "a chronic (long-term) lung disease that inflames and narrows the airways. Asthma causes recurring " +
                  "periods of wheezing (a whistling sound when you breathe), chest tightness, shortness of breath, and coughing"},

    Condition : { name: "Cancer",
                  Description: "Cancer is not just one disease, but a large group of almost 100 diseases. Its two main characteristics" +
                  " are uncontrolled growth of the cells in the human body and the ability of these cells to migrate from the " +
                  "original site and spread to distant sites. If the spread is not controlled, cancer can result in death."},

    Condition : { name :"Depression",
                  Description : "Depression is a mood disorder that causes a persistent feeling of sadness and loss of interest. Also " +
                  "called major depressive disorder or clinical depression, it affects how you feel, think and behave and can lead to a " +
                  "variety of emotional and physical problems."},

    Condition : { name : "Diabetes",
                  Description : "Diabetes mellitus is a group of metabolic diseases characterized by hyperglycemia resulting from defects" +
                  " in insulin secretion, insulin action, or both. The chronic hyperglycemia of diabetes is associated with long-term" +
                  " damage, dysfunction, and failure of various organs, especially the eyes, kidneys, nerves, heart, and blood vessels."},

    Condition : { name: "Heart Disease",
                  Description: "Heart disease is a general term that refers to any disease or condition of the heart, including coronary" +
                  " heart disease, hypertension, heart failure, congenital heart disease, disorders of the heart valves, heart infections," +
                  " cardiomyopathy, conduction disorders, and heart arrythmias."},

    Condition : { name : "High Cholesterol",
                  Description: "When you have high cholesterol, you may develop fatty deposits in your blood vessels. Eventually, " +
                  "these deposits make it difficult for enough blood to flow through your arteries. Your heart may not get as much " +
                  "oxygen-rich blood as it needs, which increases the risk of a heart attack. Decreased blood flow to your brain can " +
                  "cause a stroke."},

    Condition : { name : "High Blood Pressure",
                  Description: "Blood pressure is the force of blood pushing against the walls of the arteries as the heart pumps blood. " +
                  "High blood pressure, sometimes called hypertension, happens when this force is too high"},

    Condition : { name: "Pregnancy Loss/Birth Defects",
                  Description: "Some problems that occur in babies are due to genetic disorders. These disorders result from " +
                  "abnormalities in one or more genes or in chromosomes (see Genes and Chromosomes and see Overview of Chromosomal Disorders). Some abnormalities are hereditary. That is, they are passed down from generation to generation. Others—said to occur spontaneously—result when genetic material in the parents’ sperm or egg cells or in the cells of the developing embryo is damaged by chance or by drugs, chemicals, or other damaging substances (such as x-rays)."}
});