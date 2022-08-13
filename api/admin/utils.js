'use strict';
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

  async create(UserId, EntryId, Item) {
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

  async presign(UserId, EntryId, FileName) {
    const params = {
      Bucket: 'splatterandscream-dev',
      Key: `${UserId}/entry/${EntryId}/images/${FileName}`,
      ContentType: 'multipart/form-data',
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

  async deleteById(UserId, EntryId, Items) {
    try {
      if (Items.length > 0) {
        const bucket = 'splatterandscream-dev';
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
        TableName: 'movie-reviews_reviews',
        Key: { "UserId": UserId, "EntryId": EntryId },
      };
      await db.delete(params);
      return params.Key;
    } catch (err) {
      return err || err.message;
    };
  };
}

module.exports = AdminEntryUtils;