const express = require('express');
const Place = require('../models/Place');
const PlaceController = require('../controllers/PlacesController');
let router = express.Router();
const authenticateOwner = require('../middlewares/authenticateOwner');

router.route('/')
  .get(PlaceController.index)
  .post(
    PlaceController.multerMiddleware(),
    PlaceController.create,
    PlaceController.saveImage);

router.route('/:slug')
  .get(PlaceController.find,PlaceController.show)
  .put(PlaceController.find,authenticateOwner,PlaceController.update)
  .delete(PlaceController.find,authenticateOwner,PlaceController.destroy);

module.exports = router;
