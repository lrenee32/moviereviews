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
    let fq = 'contains(Title, :Title)';
    let ex = { ':SK': 'ENTRY', ':Title': SearchTerm };

    if (EntryType !== '') {
      fq += ' AND EntryType = :EntryType';
      ex = { ...ex, ':EntryType': EntryType };
    }

    try {
      const params = {
        TableName: process.env.DynamoDBTable,
        KeyConditionExpression: 'SK = :SK',
        FilterExpression: fq,
        ExpressionAttributeValues: ex,
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