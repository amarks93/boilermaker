const {
  db,
  models: { User },
} = require('./server/db');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const [alex, jd, tasha] = await Promise.all([
    User.create({ username: 'alex', password: 'luna' }),
    User.create({ username: 'jd', password: 'wildflower' }),
    User.create({ username: 'tasha', password: 'lala' }),
  ]);

  return {
    users: { alex, jd, tasha },
  };
}

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

if (module === require.main) {
  runSeed();
}

module.exports = seed;
