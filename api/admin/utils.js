'use strict';
const { v4: uuidv4 } = require('uuid');
const Database = require('../shared/db');
const db = new Database();

class ReviewUtils {
  async searchAll(userId, searchTerm) {
    try {
      const params = {
        TableName: 'movie-reviews_user-reviews',
        KeyConditionExpression: 'UserId = :userId',
        FilterExpression: 'contains(Title, :title)',
        ExpressionAttributeValues: { 
          ':userId': userId,
          ':title': searchTerm,
        },
      };
      const res = await db.query(params);
      return res.Items;
    } catch (err) {
      return err || err.message;
    };
  };
  async searchById(reviewId) {
    try {
      const params = {
        TableName: 'movie-reviews_user-reviews',
        KeyConditionExpression: 'ReviewId = :reviewId',
        ExpressionAttributeValues: { 
          ':reviewId': reviewId,
        },
      };
      const res = await db.query(params);
      return res.Items;
    } catch (err) {
      return err || err.message;
    };
  };
  async create(userId, item) {
    try {
      const params = {
        TableName: 'movie-reviews_user-reviews',
        Item: {
          UserId: userId,
          ReviewId: uuidv4(),
          Created: new Date().toISOString().split('T')[0],
          Title: item.title,
          Year: item.year,
          TMDBId: item.tmdbId,
          Rating: item.rating,
          Review: item.review,
        },
      };

      await db.put(params);
      return params.Item;
    } catch (err) {
      return err || err.message;
    };
  };
  async editById(userId, reviewId, item) {
    try {
      const params = {
        TableName: 'movie-reviews_user-reviews',
        Item: {
          UserId: userId,
          ReviewId: reviewId,
          Created: item.created,
          Title: item.title,
          Year: item.year,
          TMDBId: item.tmdbId,
          Rating: item.rating,
          Review: item.review,
        },
      };

      await db.put(params);
      return params.Item;
    } catch (err) {
      return err || err.message;
    };
  };
  async deleteById(userId, id) {
    try {
      const params = {
        TableName: 'movie-reviews_user-reviews',
        Key: { "UserId": userId, "ReviewId": id },
      };
      await db.delete(params);
      return params.Key;
    } catch (err) {
      return err || err.message;
    };
  };
}

module.exports = ReviewUtils;