'use strict';
const Database = require('../shared/db');
const db = new Database();
const S3 = require('../shared/s3');
const s3 = new S3();

class AdminEntryUtils {
  async search(UserId, SearchTerm) {
    try {
      const params = {
        TableName: process.env.DynamoDBTable,
        IndexName: 'Created-Index',
        ScanIndexForward: false,
        KeyConditionExpression: 'SK = :SK',
        FilterExpression: 'contains(Title, :Title) AND UserId = :UserId',
        ExpressionAttributeValues: { 
          ':SK': 'ENTRY',
          ':UserId': UserId,
          ':Title': SearchTerm,
        },
      };
      const res = await db.query(params);
      return res.Items;
    } catch (err) {
      return err || err.message;
    };
  };

  async create(UserId, EntryId, Item) {
    try {
      const params = {
        TableName: process.env.DynamoDBTable,
        Item: {
          SK: 'ENTRY',
          PK: EntryId,
          UserId: UserId,
          Title: Item.Title,
          EntryType: Item.EntryType,
          Featured: Item.Featured,
          SitePick: Item.SitePick,
          Content: Item.Content,
          Details: Item.Details,
          Created: Date.now(),
          LastUpdated: Date.now(),
          Tags: Item.Tags,
          UserRating: Item.UserRating,
        },
      };

      await db.put(params);
      return params.Item;
    } catch (err) {
      return err || err.message;
    };
  };

  async presign(UserId, EntryId, FileName) {
    const params = {
      Bucket: process.env.S3Bucket,
      Key: `images/${UserId}/entry/${EntryId}/${FileName}`,
      ContentType: 'binary/octet-stream',
      Expires: 600,
    }
    try {
      const presignedURL = await s3.presign('putObject', params);
      return presignedURL;
    } catch (err) {
      return err || err.message;
    };
  };

  async editById(UserId, EntryId, Item) {
    try {
      const params = {
        TableName: process.env.DynamoDBTable,
        Item: {
          SK: 'ENTRY',
          PK: EntryId,
          UserId: UserId,
          Title: Item.Title,
          EntryType: Item.EntryType,
          Featured: Item.Featured,
          SitePick: Item.SitePick,
          Content: Item.Content,
          Details: Item.Details,
          Created: Item.Created,
          LastUpdated: Date.now(),
          Tags: Item.Tags,
          UserRating: Item.UserRating,
        },
      };

      await db.put(params);
      return params.Item;
    } catch (err) {
      return err || err.message;
    };
  };

  async deleteById(EntryId, Items) {
    try {
      if (Items.length > 0) {
        const bucket = process.env.S3Bucket;
        const keys = Items.map(i => ({
          Key: i.replace(`https://${bucket}.s3.amazonaws.com/`, ''),
        }));
        await s3.deleteObjects({
          Bucket: bucket,
          Delete: {
            Objects: keys,
          },
        });
      }

      const params = {
        TableName: process.env.DynamoDBTable,
        Key: { "SK": 'ENTRY', "PK": EntryId },
      };
      await db.delete(params);
      return params.Key;
    } catch (err) {
      return err || err.message;
    };
  };

  async deleteImages(Items) {
    try {
      const bucket = process.env.S3Bucket;
      const keys = Items.map(i => ({
        Key: i.replace(`https://${bucket}.s3.amazonaws.com/`, ''),
      }));
      return await s3.deleteObjects({
        Bucket: bucket,
        Delete: {
          Objects: keys,
        },
      });
    } catch (err) {
      return err || err.message;
    };
  };
}

module.exports = AdminEntryUtils;