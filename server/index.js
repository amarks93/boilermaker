const PORT = process.env.PORT || 8080;
const app = require('./app');
const db = require('./db/db.js');

const init = async () => {
  try {
    await db.sync();
    app.listen(PORT, () => console.log(`App running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

init();
