'use strict';
const { v4: uuidv4 } = require('uuid');
const Database = require('../shared/db');
const db = new Database();

class ReviewUtils {
  async search(searchTerm) {
    try {
      const params = {
        TableName: 'movie-reviews_user-reviews',
        KeyConditionExpression: 'UserId = :userId',
        FilterExpression: 'contains(Title, :title)',
        ExpressionAttributeValues: { 
          ':userId': 'a5c723d5-89ba-4554-a09d-ee3870be41a3',
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
        KeyConditionExpression: 'UserId = :userId AND ReviewId = :reviewId',
        ExpressionAttributeValues: { 
          ':userId': 'a5c723d5-89ba-4554-a09d-ee3870be41a3',
          ':reviewId': reviewId,
        },
      };
      const res = await db.query(params);
      return res.Items[0];
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
          Created: item.Created,
          Title: item.Title,
          Year: item.Year,
          TMDBId: item.TMDBId,
          Rating: item.Rating,
          Review: item.Review,
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