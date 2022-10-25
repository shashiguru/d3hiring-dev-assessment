# NodeJS API Asessment

## Repository
1. Source code is stored in GitHub and it can be accessible at https://github.com/shashiguru/d3hiring-dev-assessment

## Hosting
1. API is deployed in AZURE App Service with conguration.
2. It can be accessible at https://d3hiring-dev-assessment.azurewebsites.net/api/

## Setup and Run
1. Clone repository from given source control url(GitHub).
2. Install its dependencies with command `npm i`
3. Run the application with command `npm run start`
4. Access the API with host of `http://localhost:3000/api/`

## Database configuration
1. Database is configured in MySQL database.
2. It can be configured with any database tool with below configuration.
    ### Config:
        `host: "sql6.freemysqlhosting.net",
        port: 3306,
        username: "sql6528223",
        password: password is provided in email,
        database: "sql6528223"`

    ### Note: Please refer to the email for the password, i have sent in completion of assessment.

3. Database has below tables
   ### Student
    #### Schema:
        Id int primary,
        Email varchar primary,
        Status tinyint,
        CreatedDate datetime,
        UpdatedDate datetime
   ### Teacher
    #### Schema:
        Id int primary,
        Email varchar primary,
        CreatedDate datetime,
        UpdatedDate datetime
   ### Registration
    #### Schema:
        studentEmail varchar primary,
        teacherEmail varchar primary,
        CreatedDate datetime,

## Test cases
1. For test cases, below are libraries used.
    #### jest
    #### mocha
    #### superfast
    #### should
 ### Unit Test:
 1. Unit test cases covered the testing of business logic of the application. So i have covered the services of application.
 2. To run the unit test cases run the below command
    `npm run unit-test`

 ### Integration Test:
 1. Integration test covers the end to end funtionlaity of the application. It covered functionality of the end points.
 2. To run the test cases 
    1. Run the API with command `npm run start`.
    2. Run test cases with command `npm run int-test`.

## API Details
1. Below are API endpoints has implemented.
    ### Register
    This endpoint is used to register the teacher and student.
    #### Request URL:
        POST https://d3hiring-dev-assessment.azurewebsites.net/api/register
        
    #### Request Body:
     ##### Schema:
            {
                "teacher": string
                "students":
                        [
                            string,
                        ]
            }
     ##### Example:
            {
                "teacher": "teacherken@gmail.com"
                "students":
                    [
                        "studentjon@gmail.com",
                        "studenthon@gmail.com"
                    ]
            }
        
     #### Response:
      ##### Status code: 204
    
    ### Common Students
    This endpoint is used to reteive common students for given teachers.
     #### Request URL:
            GET https://d3hiring-dev-assessment.azurewebsites.net/api/commonstudents?teacher=teacherken%40gmail.com&teacher=teacherjoe%40gmail.com
        
    #### Response Body:
     ##### Schema:
            {
            "students" :
                [
                    string
                ]
            }
     ##### Example:
            {
            "students" :
                [
                "commonstudent1@gmail.com", 
                "commonstudent2@gmail.com",
                "student_only_under_teacher_ken@gmail.com"
                ]
            }
     ##### Status code: 200

    ### Suspend Student
    This endpoint is used to suspend given student.
     #### Request URL:
            GET https://d3hiring-dev-assessment.azurewebsites.net/api/suspend

     #### Request Body:
      ##### Schema:
           {
                "student" : string
            }
      ##### Example:
            {
                "student" : "studentmary@gmail.com"
            }
      ##### Status code: 200

    ### Retrieve Notifications
    This endpoint is used to retieve reciepents of notifications.
     #### Request URL:
            POST https://d3hiring-dev-assessment.azurewebsites.net/api/retrievefornotifications

     #### Request Body:
     ##### Schema:
            {
            "teacher":  string,
            "notification": string
            }
     ##### Example:
            {
            "teacher":  "teacherken@gmail.com",
            "notification": "Hello students! @studentagnes@gmail.com @studentmiche@gmail.com"
            }
           
     #### Response Body:
      ##### Schema:
           {
            "recipients":
                [
                    string
                ]   
            }
      ##### Example:
           {
            "recipients":
                [
                "studentbob@gmail.com",
                "studentagnes@gmail.com", 
                "studentmiche@gmail.com"
                ]   
            }
      ##### Status code: 200

## Testing Instructions
Detailed postman collection is in github along with repo, you can access the details at
https://github.com/shashiguru/d3hiring-dev-assessment/tree/main/postman_collection

