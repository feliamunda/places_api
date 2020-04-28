const express = require('express');
const router = express.Router();
const authenticateOwner = require('../middlewares/authenticateOwner');
const visitsController = require('../controllers/VisitsController');
const jwtMiddleware = require('express-jwt');
const jwtSecret = require('../config/secrets').jwtSecret;

router.route('/')
  .get(jwtMiddleware({secret:jwtSecret}),visitsController.index)
  .post(visitsController.create);

router.route('/:visit_id')
  .delete(visitsController.find,authenticateOwner,visitsController.destroy)

module.exports = router;
