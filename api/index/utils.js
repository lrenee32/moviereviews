'use strict';
const Database = require('../shared/db');
const db = new Database();

function sortEntries(arr) {
  const sorted = arr.sort((a, b) => {
    const dateA = new Date(a.Created);
    const dateB = new Date(b.Created);
    return dateA < dateB ? 1 : dateA > dateB ? -1 : 0;
  });

  return {
    Featured: sorted.filter(i => i.Featured),
    All: sorted,
  }
};

class EntryUtils {
  async search(SearchTerm, EntryType) {
    try {
      const params = {
        TableName: process.env.DynamoDBTable,
        KeyConditionExpression: 'SK = :SK',
        FilterExpression: 'contains(Title, :Title) AND EntryType = :EntryType',
        ExpressionAttributeValues: { 
          ':SK': 'ENTRY',
          ':Title': SearchTerm,
          ':EntryType': EntryType,
        },
      };
      const res = await db.query(params);
      return sortEntries(res.Items);
    } catch (err) {
      return err || err.message;
    };
  };

  async searchById(PK) {
    try {
      const params = {
        TableName: process.env.DynamoDBTable,
        KeyConditionExpression: 'SK = :SK AND PK = :PK',
        ExpressionAttributeValues: { 
          ':SK': 'ENTRY',
          ':EntryId': PK,
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