const express = require('express');
const router = express.Router();
import AdministrationController from './controller';
const administration= new AdministrationController();

router
  .get('/', administration.healthCheck)
  .get('/commonstudents', administration.commonStudents)
  .post('/register', administration.register)
  .post('/suspend', administration.suspend)
  .post('/retrievefornotifications', administration.notifications)

export const routes = router;