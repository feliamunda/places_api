const express = require('express');
const router = express.Router();
const authenticateOwner = require('../middlewares/authenticateOwner');
const findUser = require('../middlewares/findUser');
const favoritesController = require('../controllers/FavoritesController')
const jwtMiddleware = require('express-jwt');
const jwtSecret = require('../config/secrets').jwtSecret;

router.route('/')
  .get(jwtMiddleware({secret:jwtSecret}),findUser,favoritesController.index)
  .post(favoritesController.create);

router.route('/:id')
  .delete(favoritesController.find,authenticateOwner,favoritesController.destroy)

module.exports = router;
