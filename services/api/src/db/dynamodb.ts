import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const TABLE_NAME = "oddson_challenges";

let dbConnection: AWS.DynamoDB;
let dbClient: AWS.DynamoDB.DocumentClient;


/**
 * Used to grab the database connection. This should not be exported.
 * @internal
 */
const getDBConnection = () => {
  if (dbConnection !== undefined) {
    return dbConnection;
  }

  let config = {};
  if (process.env.AWS_DYNAMODB_ENDPOINT !== undefined) {
    config = { ...config, endpoint: new AWS.Endpoint(process.env.AWS_DYNAMODB_ENDPOINT) };
  }

  dbConnection = new AWS.DynamoDB(config);

  return dbConnection;
}

/**
 * Used to grab the document client, used for interactions with database table.
 * This should not be exported.
 * @internal
 */
const getDBClient = () => {
  if (dbClient !== undefined) {
    return dbClient;
  }

  let config = {};
  if (process.env.AWS_DYNAMODB_ENDPOINT !== undefined) {
    config = { ...config, endpoint: new AWS.Endpoint(process.env.AWS_DYNAMODB_ENDPOINT) };
  }

  dbClient = new AWS.DynamoDB.DocumentClient(config);

  return dbClient;
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
    getDBConnection().createTable(params, (err, data) => {
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
    getDBConnection().scan(params, (err, data) => {
      if (err) {
        console.error(err);

        resolve([]);
      } else {
        resolve(data);
      }
    });
  });
}

/**
 * Creates a challenge, does not set any odd integers
 *
 * @param body
 */
const createNewChallenge = async (body: { challenger: string, challenge: string, victim: string }) => {
  const item = {
    challenge: body.challenge,
    odds: null,
    challenger: {
      name: body.challenger,
      number: null,
    },
    victim: {
      name: body.victim,
      number: null
    },
    uuid: uuidv4(),
  }

  const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
    TableName: TABLE_NAME,
    Item: item
  };

  return new Promise((resolve) => {
    getDBClient().put(params, (err, data) => {
      if (err) {
        console.error(err);
        resolve([]);
      } else {
        resolve(
          {
            challenge: item.challenge,
            odds: item.odds,
            challenger: item.challenger,
            victim: item.victim,
            id: item.uuid // Need to rename this to id for API response
          }
        );
      }
    })
  });
};

/**
 * Retrieves a challenge based on a uuid
 *
 * @param body
 */
const getChallenge = async (uuid: string) => {
  const params: AWS.DynamoDB.DocumentClient.GetItemInput = {
    TableName: TABLE_NAME,
    Key: {
      uuid: uuid,
    }
  };

  return new Promise((resolve) => {
    getDBClient().get(params, (err, data) => {
      if (err) {
        console.error(err);
        resolve([]);
      } else {
        console.log(data)
        resolve(data.Item);
      }
    })
  });
};

export default {
  setupDatabase,
  getAllChallenges,
  createNewChallenge,
  getChallenge
};
