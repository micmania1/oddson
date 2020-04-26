import AWS from 'aws-sdk';

const TABLE_NAME = "oddson_challenges";

let dbConfig: AWS.DynamoDB;

/**
 * Used to grab the database config. This should not be exported.
 * @internal
 */
const db = () => {
  if (dbConfig !== undefined) {
    return dbConfig;
  }

  let config = {};
  if (process.env.AWS_DYNAMODB_ENDPOINT !== undefined) {
    config = { ...config, endpoint: new AWS.Endpoint(process.env.AWS_DYNAMODB_ENDPOINT) };
  }

  dbConfig = new AWS.DynamoDB(config);

  return dbConfig;
}

/**
 * Used for local development only in order to setup a local database
 *
 * @devonly this will only work in development.
 *
 * Permission required:
 *   dynamodb:CreateTable
 */
const setupDatabase = () => {
  const params = {
    TableName: TABLE_NAME,
    AttributeDefinitions: [
      {
        AttributeName: "uuid",
        AttributeType: "S",
      },
    ],
    KeySchema: [
      {
        AttributeName: "uuid",
        KeyType: "HASH",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  };

  return new Promise((resolve, reject) => {
    db().createTable(params, (err, data) => {
      if (err) {
        console.error(err);

        reject(`Unable to create the table: ${TABLE_NAME}`);
      } else {
        resolve(data);
      }
    })
  });
}

/**
 * Lists all odds on challenges
 *
 * @devonly this will only work in development.
 *
 * Premission required:
 *  dynamodb:Scan
 */
const getAllChallenges = async () => {
  const params = {
    TableName: TABLE_NAME,
  };

  return new Promise((resolve) => {
    db().scan(params, (err, data) => {
      if (err) {
        console.error(err);

        resolve([]);
      } else {
        resolve(data);
      }
    });
  });
}

export default {
  setupDatabase,
  getAllChallenges,
}
