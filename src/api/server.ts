const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan= require('morgan');
import { AppDataSource } from "../infrastucture/data-source";
import {routes} from "./administration/router";
import { StudentService }  from "../services/student-service";
import { TeacherService } from "../services/teacher-service";
import { RegistrationService } from "../services/registration-service";

// defining the Express app
const app = express();

// enabling CORS for all requests
app.use(cors());

// bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//enabling logging
app.use(morgan('dev'));

// Inject Services into Middleware
const services = async (req, res, next) => {  // Can also Use a DI Container Library
  let db = AppDataSource;
  let ss = new StudentService(db);
  let ts = new TeacherService(db);
  req.services = Object.freeze({
    DataSource: db,
    IStudentService : ss,
    ITeacherService : ts,
    IRegistrationService: new RegistrationService(db, ts, ss)
  });
  next();
}

// enabling routing of API
app.use('/api', services, routes);

//initializing databse setup
AppDataSource.initialize().then(async () => {
    console.log("Database setup ready! Connection healthy!")
}).catch(error => console.log(error));

//enabling error handling for 404 - Not found
app.use(function (req, res) {
    res.status(404).json({
      status: 'Not Found'
    });
  });

//enabling error handling for other exceptions - 500
app.use((error, req, res, next)=>{
    res.status(error.status||500);
    res.json({
        error:{
            message:error.message
        }
    })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
})