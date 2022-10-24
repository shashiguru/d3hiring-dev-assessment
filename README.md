# NodeJS API Asessment

## Repository
1. Source code is stored in GitHub and it can be accessible at URL

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
        password: "qilk9h8bDV",
        database: "sql6528223"`
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
    ### mocha
    ### superfast
    ### should
2. To run the test cases 
    1. Run the API with command `npm run start`.
    2. Run test cases with command `mocha`.

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
        
     #### Response Body:
      ##### Schema:
           {
                "student" : string
            }
      ##### Example:
            {
                "student" : "studentmary@gmail.com"
            }
      ##### Status code: 200


details of end points
its schema like request body and response

## Testing
Details of postman collection 

