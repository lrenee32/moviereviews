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
  async search(Request) {
    let kce = 'SK = :SK';
    let fe = 'contains(Title, :Title)';
    let eav = { ':SK': 'ENTRY', ':Title': Request.SearchTerm };

    Object.keys(Request).map((i) => {
      if (
        (i !== 'SearchTerm' && i !== 'Sort' && i !== 'Limit') &&
        Request[i] !== ''
      ) {
        if (i === 'Featured' || i === 'SitePick') {
          return fe += ` AND attribute_exists(${i})`;
        }
        fe += ` AND ${i}  = :${i}`;
        return eav = { ...eav, [`:${i}`]: Request[i] };
      }
    });

    try {
      const params = {
        TableName: process.env.DynamoDBTable,
        IndexName: Request.Sort !== '' ? Request.Sort + '-Index' : 'Created-Index',
        ScanIndexForward: false,
        KeyConditionExpression: kce,
        FilterExpression: fe,
        ExpressionAttributeValues: eav,
        Limit: Number(Request.Limit),
      };
      const res = await db.query(params);
      return res.LastEvaluatedKey ?
        { data: res.Items, next: res.LastEvaluatedKey } :
        { data: res.Items };
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