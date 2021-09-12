const Sequelize = require('sequelize');
const db = require('../db');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const tokenSecret = process.env.JWT;

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
  },
});

User.prototype.correctPassword = function (candidatePwd) {
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = async function () {
  const token = await jwt.sign({ id: this.id }, tokenSecret);
  return token;
};

User.authenticate = async function ({ username, password }) {
  const user = await User.findOne({ where: { username } });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error('Incorrect username/password');
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

User.findByToken = async function (token) {
  try {
    const userObject = await jwt.verify(token, tokenSecret);
    if (userObject) {
      const user = User.findByPk(userObject.id);
      return user;
    }
    const error = Error('bad token');
    error.status = 401;
    throw error;
  } catch (err) {
    const error = Error('bad token');
    error.status = 401;
    throw error;
  }
};

User.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);
  user.password = hashedPassword;
});

User.beforeUpdate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);
  user.password = hashedPassword;
});

User.beforeBulkCreate((users) =>
  Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      user.password = hashedPassword;
    })
  )
);

module.exports = User;
