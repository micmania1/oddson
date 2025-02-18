import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

let TABLE_NAME = "oddson_challenges";
if (process.env.AWS_DYNAMODB_TABLE !== undefined) {
  TABLE_NAME = process.env.AWS_DYNAMODB_TABLE;
}

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
        AttributeName: "id",
        AttributeType: "S",
      },
    ],
    KeySchema: [
      {
        AttributeName: "id",
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
const createNewChallenge = async (challenger: string, challenge: string, victim: string) => {
  const item = {
    challenge: challenge,
    odds: null,
    challenger: {
      name: challenger,
      number: null,
    },
    victim: {
      name: victim,
      number: null
    },
    id: uuidv4(),
    status: "new"
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
            id: item.id
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
const getChallenge = async (id: string) => {
  const params: AWS.DynamoDB.DocumentClient.GetItemInput = {
    TableName: TABLE_NAME,
    Key: {
      id,
    }
  };

  return new Promise((resolve) => {
    getDBClient().get(params, (err, data) => {
      if (err) {
        console.error(err);
        resolve([]);
      } else {
        resolve(data.Item);
      }
    })
  });
};

/**
 * Sets the odds and the chosen number of the victim
 *
 * @param body
 */
const activateChallenge = async (id: string, odds: number, victim_number: number) => {
  const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
    Key: {
      id,
    },
    UpdateExpression: "set #victim.#number = :victim_number, #odds = :odds, #status = :status",
    ExpressionAttributeNames: {
      "#victim": "victim",
      "#number": "number",
      "#odds": "odds",
      "#status": "status"
    },
    ExpressionAttributeValues: {
      ":victim_number": victim_number,
      ":odds": odds,
      ":status": "activated"
    },
    ReturnValues: "ALL_NEW",
    TableName: TABLE_NAME,
  };

  return new Promise((resolve) => {
    getDBClient().update(params, (err, data) => {
      if (err) {
        console.error(err);
        resolve([]);
      } else {
        resolve(data.Attributes)
      }
    })
  });
};

/**
 * Sets the the chosen number of the challenger completing the challenge flow
 *
 * @param body
 */
const completeChallenge = async (id: string, challenger_number: number) => {
  const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
    Key: {
      id,
    },
    UpdateExpression: "set #challenger.#number = :challenger_number, #status = :status",
    ExpressionAttributeNames: {
      "#challenger": "challenger",
      "#number": "number",
      "#status": "status"
    },
    ExpressionAttributeValues: {
      ":challenger_number": challenger_number,
      ":status": "complete"
    },
    ReturnValues: "ALL_NEW",
    TableName: TABLE_NAME,
  };

  return new Promise((resolve) => {
    getDBClient().update(params, (err, data) => {
      if (err) {
        console.error(err);
        resolve([]);
      } else {
        resolve(data.Attributes)
      }
    })
  });
};

export default {
  setupDatabase,
  getAllChallenges,
  createNewChallenge,
  getChallenge,
  activateChallenge,
  completeChallenge
};
