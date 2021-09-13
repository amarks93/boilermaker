const { expect } = require('chai');
const {
  db,
  models: { User },
} = require('../server/db');
const seed = require('../seed.js');
const app = require('../server/app');
const request = require('supertest');

describe('User routes', () => {
  beforeEach(async () => {
    await seed();
  });
  describe('/api/users/', () => {
    it('gets all users at GET /api/users', async () => {
      const res = await request(app).get('/api/users').expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(3);
    });
  });
  describe('/api/users/:userId', () => {
    it('gets a single user at a specified id', async () => {
      const res = await request(app).get('/api/users/3').expect(200);
      expect(res.body).to.be.an('object');
      expect(res.body.username).to.be.equal('tasha');
    });
  });
});
