const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan= require('morgan');
import { DataSource } from "typeorm";
import { AppDataSource } from "../infrastucture/data-source";
import {routes} from "./administration/router";

// defining the Express app
const app = express();

// enabling CORS for all requests
app.use(cors());

// bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//enabling logging
app.use(morgan('dev'));

// enabling routing of API
app.use('/api', routes);

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