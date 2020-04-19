import app from './app';
import DB from './db';

require('dotenv').config();

// Local instantiation of the database tables
if (process.env.AWS_DYNAMODB_ENDPOINT) {
  console.log("Setting up database.")

  DB.setupDatabase();
}

const port = 4000;

app.listen(port);
console.log(`listening on http://localhost:${port}`)

export default app;
