'use strict';
const Database = require('../shared/db');
const db = new Database();

const setFeatureType = async (arr, type) => {
  const feature = await db.query({
    TableName: process.env.DynamoDBTable2,
    KeyConditionExpression: 'FeatureType = :FeatureType',
    ExpressionAttributeValues: { 
      ':FeatureType': type,
    },
  });

  return feature.Items
    .map(i => arr.find(j => i.EntryId === j.EntryId));
};

const sortEntries = async (arr) => {
  const sorted = arr.sort((a, b) => {
    const dateA = new Date(a.Created);
    const dateB = new Date(b.Created);
    return dateA < dateB ? 1 : dateA > dateB ? -1 : 0;
  });

  return {
    Featured: await setFeatureType(arr, 'feature'),
    SitePicks: await setFeatureType(arr, 'sitepick'),
    All: sorted,
  }
};

class EntryUtils {
  async search(SearchTerm) {
    try {
      const params = {
        TableName: process.env.DynamoDBTable1,
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
        TableName: process.env.DynamoDBTable1,
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
};

module.exports = EntryUtils;