'use strict';
const Database = require('../shared/db');
const db = new Database();

class EntryUtils {
  async search(Request) {
    let kce = 'SK = :SK';
    let fe = 'contains(Title, :Title)';
    let eav = { ':SK': 'ENTRY', ':Title': Request.SearchTerm };

    Object.keys(Request).map((i) => {
      if (
        (i !== 'SearchTerm' && i !== 'Sort' && i !== 'Limit' && i !== 'LastEvaluatedKey') &&
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
      if (Request.LastEvaluatedKey) {
        const obj = JSON.parse(Request.LastEvaluatedKey);
        params.ExclusiveStartKey = { SK: 'ENTRY', PK: obj.PK, Created: obj.Created };
      }
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