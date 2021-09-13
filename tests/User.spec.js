const { expect } = require('chai');
const {
  db,
  models: { User },
} = require('../server/db');
const seed = require('../seed.js');
const jwt = require('jsonwebtoken');

describe('User model', () => {
  let users;
  let tokenSecret;

  beforeEach(async () => {
    users = (await seed()).users;
    tokenSecret = process.env.JWT;
  });

  describe('instanceMethods', () => {
    describe('generateToken', () => {
      it('returns a token with the id of the user', async () => {
        const token = await users.alex.generateToken();
        const { id } = await jwt.verify(token, tokenSecret);
        expect(id).to.equal(users.alex.id);
      });
    });
    describe('correctPassword', () => {
      it('returns true when passwords correctly match', async () => {
        const truePassword = 'luna';
        const response = await users.alex.correctPassword(truePassword);
        expect(response).to.equal(true);
      });
      it('returns false when passwords incorrectly match', async () => {
        const falsePassword = 'artemis';
        const response = await users.alex.correctPassword(falsePassword);
        expect(response).to.equal(false);
      });
    });
  });
});
