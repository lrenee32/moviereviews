'use strict';
const axios = require('axios');
const Database = require('../shared/db');
const { Reviews } = require('../tests/tests');
const db = new Database();

async function getFilmDetails(arr) {
  const baseUri = 'https://api.themoviedb.org/3/movie/'
  let response = {
    recent: [],
    all: [],
  }
  let promises = [];

  arr.map((i, index) => {
    const params = {
      api_key: '51d3b35a03189901a4907665233f6831',
    };
    promises = [
      axios.get(`${baseUri}${i.TMDBId}`, { params })
        .then(res => {
          arr[index].Details = res.data;
          return arr[index];
        }),
      ...promises
    ];
  });
  await Promise.all(promises)
    .then(data => {
      const sorted = data.sort((a, b) => {
        const dateA = new Date(a.Created);
        const dateB = new Date(b.Created);
        return dateA < dateB ? 1 : dateA > dateB ? -1 : 0;
      });
      response.all = sorted;
      response.recent = sorted.slice(0, 4);
    });
  
  return response;
}

class ReviewUtils {
  async search(searchTerm) {
    try {
      // const params = {
      //   TableName: 'movie-reviews_user-reviews',
      //   KeyConditionExpression: 'UserId = :userId',
      //   FilterExpression: 'contains(Title, :title)',
      //   ExpressionAttributeValues: { 
      //     ':userId': 'a5c723d5-89ba-4554-a09d-ee3870be41a3',
      //     ':title': searchTerm,
      //   },
      // };
      // const res = await db.query(params);
      // return getFilmDetails(res.Items);
      return Reviews;
    } catch (err) {
      return err || err.message;
    };
  };

  async searchById(id) {
    try {
      const params = {
        TableName: 'movie-reviews_user-reviews',
        KeyConditionExpression: 'UserId = :userId AND ReviewId = :reviewId',
        ExpressionAttributeValues: { 
          ':userId': 'a5c723d5-89ba-4554-a09d-ee3870be41a3',
          ':reviewId': id,
        },
      };
      const res = await db.query(params);
      return res.Items[0];
    } catch (err) {
      return err || err.message;
    };
  };
};

module.exports = ReviewUtils;