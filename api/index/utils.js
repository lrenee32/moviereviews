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
  async search(SearchTerm, EntryType, Sort) {
    let kce = 'SK = :SK';
    let fe = 'contains(Title, :Title)';
    let eav = { ':SK': 'ENTRY', ':Title': SearchTerm };

    if (EntryType !== '') {
      fe += ' AND EntryType = :EntryType';
      eav = { ...eav, ':EntryType': EntryType };
    }

    try {
      const params = {
        TableName: process.env.DynamoDBTable,
        IndexName: Sort ? Sort : 'Created',
        KeyConditionExpression: kce,
        FilterExpression: fe,
        ExpressionAttributeValues: eav,
      };
      const res = await db.query(params);
      return { All: res.Items };
    } catch (err) {
      return err || err.message;
    };
  };

  async searchById(EntryId) {
    try {
      const params = {
        TableName: process.env.DynamoDBTable,
        KeyConditionExpression: 'SK = :SK AND PK = :PK',
        ExpressionAttributeValues: { 
          ':SK': 'ENTRY',
          ':PK': EntryId,
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