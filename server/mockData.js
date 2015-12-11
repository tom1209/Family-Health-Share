/**
 * Created by Tom on 2015-10-09.
 * This just to insert some mock data in for testing purposes.
 */


//////////////////////Creating a mock family//////////////////////

if(Families.find().count() ===0)
{
    Families.insert({
        confirmPassword: "password",
        familyID: "schrute1",
        familyName: "Schrute",
        familyPassword: "password",
        conditions: [
            {
                count: 5,
                name: "Diabetes"
            },
            {
                count: 3,
                name: "High Cholesterol"
            },
            {
                count: 3,
                name: "Heart Disease"
            },
            {
                count: 1,
                name: "Cancer"
            },
            {
                count: 1,
                name: "Arthritis"
            },
            {
                count: 1,
                name: "High Blood Pressure"
            }
        ],
        familyMembers: [
            //Dwight Schrute
            {
                _Id: "ukMfBju66KoYT9a4j",
                email:  "dwight@example.com",
                DOB: "05/05/1971",
                name: "Dwight Schrute",
                firstName: "Dwight",
                gender: "Male",
                lastName: "Schrute",
                middleName: "K",
                inactiveMember: true,
                conditions:[
                    {
                        name: "Cancer",
                        notes: "Since 2007"
                    },
                    {
                        name: "Diabetes",
                        notes: "Type 1 diabetes since birth"
                    }
                ]
            },

            //Effie Schrute
            {
                _Id: "u2sdBj2asKoYT9a4j",
                DOB: "05/06/1928",
                DOD: "05/06/2001",
                name: "Effie Schrute",
                firstName: "Effie",
                gender: "Female",
                lastName: "Schrute",
                middleName: "Margaret",
                inactiveMember: true,
                conditions:[
                    {
                        name: "Diabetes",
                        notes: "Type 1 diabetes since birth"
                    }
                ]
            },

            //Mose Schrute
            {
                _Id: "ka9s8dhasKoYT9a4j",
                email: "mose@example.com",
                DOB: "05/06/1983",
                name: "Mose Schrute",
                firstName: "Mose",
                gender: "Male",
                lastName: "Schrute",
                middleName: "K",
                inactiveMember: true,
                conditions:[
                    {
                        name: "Diabetes",
                        notes: "Type 1 diabetes since birth"
                    },
                    {
                        name: "High Cholesterol",
                        notes: "Started at 12"
                    }
                ]
            },

            //Eldred Schrute
            {
                _Id: "u2sdBj2ksjd87ha4j",
                email: "eldred@example.com",
                name: "Eldred Schrute",
                DOB: "01/26/1944",
                firstName: "Eldred",
                gender: "Male",
                lastName: "Schrute",
                middleName: "J",
                inactiveMember: true,
                conditions:[
                    {
                        name: "Diabetes",
                        notes: "Type 1 diabetes since birth"
                    },
                    {
                        name: "High Cholesterol",
                        notes: "Started when I turned about 50"
                    }
                ]
            },

            //Fannie Schrute
            {
                _Id: "9skdjd7dajd87ha4j",
                email:"fannie@example.com",
                name: "Fannie Schrute",
                DOB: "01/22/1978",
                firstName: "Fannie",
                gender: "Female",
                lastName: "Schrute",
                middleName: "L",
                inactiveMember: true,
                conditions:[
                    {
                        name: "Arthritis",
                        notes: "Started to get arthritis at 38 years old"
                    }
                ]
            },

            //Jeb Schrute
            {
                _Id: "9skdjd7dajd87ha4j",
                email: "jeb@example.com",
                name: "Jeb Schrute",
                DOB: "01/01/1981",
                firstName: "Jeb",
                gender: "Male",
                lastName: "Schrute",
                middleName: "J",
                inactiveMember: true,
                conditions:[
                    {
                        name: "Diabetes",
                        notes: "Type 1 diabetes since birth"
                    }
                ]
            },

            //Agatha Schrute
            {
                _Id: "9skdjd7dajd87ha4j",
                email: "agatha@example.com",
                name: "Agatha Schrute",
                DOB: "03/04/1952",
                firstName: "Agatha",
                gender: "Female",
                lastName: "Schrute",
                middleName: "J",
                inactiveMember: true,
                conditions:[
                    {
                        name: "Cancer",
                        notes: "Thyroid cancer in 2004"
                    }
                ]
            }
        ]
    })

}
