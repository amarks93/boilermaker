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

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

// router.post('/', function (req, res, next) {});

// router.put('/:userId', function (req, res, next) {});

// router.delete('/:userId', function (req, res, next) {});

module.exports = router;
