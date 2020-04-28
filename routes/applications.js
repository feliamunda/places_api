const express = require('express');
const router = express.Router();

const authenticateAdmin = require('../middlewares/authenticateAdmin');
const findUser = require('../middlewares/findUser');
const applicationsController = require('../controllers/ApplicationsController');
const jwtMiddleware = require('express-jwt');
const jwtSecret = require('../config/secrets').jwtSecret;

router.all('*',jwtMiddleware({secret:jwtSecret}),findUser,authenticateAdmin)

router.route('/')
  .get(applicationsController.index)
  .post(applicationsController.create);

router.route('/:id')
  .delete(applicationsController.find,applicationsController.destroy)

module.exports = router;
