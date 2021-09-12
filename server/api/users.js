const User = require('../db/models/User');

const router = require('express').Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

// router.post('/', function (req, res, next) {});

// router.put('/:userId', function (req, res, next) {});

// router.delete('/:userId', function (req, res, next) {});

module.exports = router;
