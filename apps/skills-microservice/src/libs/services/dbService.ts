import { createDbClient } from "../clients";

export class DbService {
  private dbClient;

  constructor(private readonly tableName: string) {
    this.dbClient = createDbClient();
  }

  /**
   * Returns a dynamo record for a given primary key
   *
   * @param primaryKey - Primary key of record
   * @param item - item body
   * @returns A brand-new dynamo record
   *
   */
  async createItem(primaryKey: string, item: any) {
    try {
      const params = {
        TableName: this.tableName,
        Item: {
          id: primaryKey,
          ...item,
        },
      };

      await this.dbClient.put(params).promise();

      return params.Item;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  /**
   * Deletes a dynamo record for a given primary key
   *
   * @param primaryKey - Primary key of record
   * @returns
   *
   */
  async deleteItem(primaryKey: string) {
    try {
      const params = {
        TableName: this.tableName,
        Key: { id: primaryKey },
      };
      return this.dbClient.delete(params).promise();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  /**
   * Returns a dynamo record for a given primary key
   *
   * @param primaryKey - Primary key of record
   * @returns An existing dynamo record
   *
   */
  async getItem(primaryKey: string) {
    try {
      const params = {
        TableName: this.tableName,
        Key: {
          id: primaryKey,
        },
      };
      const data = await this.dbClient.get(params).promise();

      if (!data || Object.keys(data).length === 0) throw new Error("Not found");

      return data.Item;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  /**
   * Updates a dynamo record for a given primary key
   *
   * @param primaryKey - Primary key of record
   * @param item - item body
   * @returns An updated dynamo record
   *
   */
  async updateItem(primaryKey: string, item: any) {
    try {
      const params = {
        TableName: this.tableName,
        Key: { id: primaryKey },
        UpdateExpression: "set #skills = :skills",
        ExpressionAttributeNames: {
          "#skills": "skills",
        },
        ExpressionAttributeValues: {
          ":skills": item,
        },
        ReturnValues: "ALL_NEW",
      };
      const data = await this.dbClient.update(params).promise();

      return data.Attributes;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
