'use strict';
const { v4: uuidv4 } = require('uuid');
const Database = require('../shared/db');
const db = new Database();
const S3 = require('../shared/s3');
const s3 = new S3();

function sortEntries(arr) {
  return arr.sort((a, b) => {
    const dateA = new Date(a.Created);
    const dateB = new Date(b.Created);
    return dateA < dateB ? 1 : dateA > dateB ? -1 : 0;
  });
};

class AdminEntryUtils {
  async search(SearchTerm) {
    try {
      const params = {
        TableName: 'movie-reviews_reviews',
        KeyConditionExpression: 'UserId = :UserId',
        FilterExpression: 'contains(Title, :Title)',
        ExpressionAttributeValues: { 
          ':UserId': 'a5c723d5-89ba-4554-a09d-ee3870be41a3',
          ':Title': SearchTerm,
        },
      };
      const res = await db.query(params);
      return sortEntries(res.Items);
    } catch (err) {
      return err || err.message;
    };
  };

  async searchById(EntryId) {
    try {
      const params = {
        TableName: 'movie-reviews_reviews',
        KeyConditionExpression: 'UserId = :UserId AND EntryId = :EntryId',
        ExpressionAttributeValues: { 
          ':UserId': 'a5c723d5-89ba-4554-a09d-ee3870be41a3',
          ':EntryId': EntryId,
        },
      };
      const res = await db.query(params);
      return res.Items[0];
    } catch (err) {
      return err || err.message;
    };
  };

  async create(UserId, Item) {
    try {
      const entryId = uuidv4();

      const content = Item.Content.map(async(i) => {
        if (i.type === 'image') {
          i.url = await uploadImage(i.url, `entry/${entryId}`);
        }
        return i;
      });

      const params = {
        TableName: 'movie-reviews_reviews',
        Item: {
          EntryId: entryId,
          UserId: UserId,
          Title: Item.Title,
          Type: Item.Type,
          Featured: Item.Featured,
          SitePick: Item.SitePick,
          Content: content,
          Details: Item.Details,
          Created: Date.now(),
          Tags: Item.Tags,
        },
      };

      await db.put(params);
      return params.Item;
    } catch (err) {
      return err || err.message;
    };
  };

  async editById(UserId, EntryId, Item) {
    try {
      const params = {
        TableName: 'movie-reviews_reviews',
        Item: {
          EntryId: EntryId,
          UserId: UserId,
          Title: Item.Title,
          Type: Item.Type,
          Featured: Item.Featured,
          SitePick: Item.SitePick,
          Content: Item.Content,
          Details: Item.Details,
          Created: Item.Created,
          Tags: Item.Tags,
        },
      };

      await db.put(params);
      return params.Item;
    } catch (err) {
      return err || err.message;
    };
  };

  async deleteById(UserId, EntryId) {
    try {
      const params = {
        TableName: 'movie-reviews_reviews',
        Key: { "UserId": UserId, "EntryId": EntryId },
      };
      await db.delete(params);
      return params.Key;
    } catch (err) {
      return err || err.message;
    };
  };

  async uploadImage(file, bucket) {
    const params = {
      Body: file,
      Bucket: bucket,
      Key: file.name,
    };
  
    const res = await s3.put(params);
    return res;
  };
}

module.exports = AdminEntryUtils;