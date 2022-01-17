import * as AWS from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

const region = process.env.REGION ?? "us-west-2";

export const createDbClient = (): DocumentClient => {
  if (process.env.IS_OFFLINE) {
    return new AWS.DynamoDB.DocumentClient({
      region: "localhost",
      endpoint: "http://localhost:8000",
      accessKeyId: "DEFAULT_ACCESS_KEY",
      secretAccessKey: "DEFAULT_SECRET",
    });
  }

  return new AWS.DynamoDB.DocumentClient({ region });
};
