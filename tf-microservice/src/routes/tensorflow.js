const controller = require('../controllers/tensorflow'),
    router = require('express').Router();

router.get('/predict', controller.predict);

module.exports = router;