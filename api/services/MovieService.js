const fetch = require('node-fetch');
const asyncRedis = require('async-redis');

const redisConfig = sails.config.redis;
const redisClient = asyncRedis.createClient(redisConfig);

module.exports = {

  async getMovie(id) {
    const movieUrl = `https://swapi.co/api/films/${id}/`;
    // check cache for movie
    const redisKey = movieUrl;
    const redisKeyExists = await redisClient.exists(redisKey);
    if (redisKeyExists == 1) {
      const redisValue = await redisClient.get(redisKey);
      return JSON.parse(redisValue);
    }
    // fetch movie from API
    const response = await fetch(movieUrl);
    const json = await response.json();
    if (json.hasOwnProperty('detail') && json.detail == 'Not found') return null;
    // store movie in cache
    await redisClient.set(redisKey, JSON.stringify(json));
    return json;
  },
  
  async getMovies() {
    const moviesUrl = 'https://swapi.co/api/films/';
    // check cache for movies list
    const redisKey = moviesUrl;
    const redisKeyExists = await redisClient.exists(redisKey);
    if (redisKeyExists == 1) {
      const movieIds = await redisClient.lrange(redisKey, 0, -1);
      const movieResults = await Promise.all(movieIds.map(async (id) => {
        const movie = await MovieService.getMovie(id);
        return movie;
      }));
      return movieResults;
    }
    // fetch movies from API
    const response = await fetch(moviesUrl);
    const json = await response.json();
    const results = json.results;
    // store movies in cache
    const ids = await Promise.all(results.map(async (movie) => {
      const movieUrl = `https://swapi.co/api/films/${movie.episode_id}/`;
      await redisClient.set(movieUrl, JSON.stringify(movie));
      return movie.episode_id;
    }));
    await redisClient.rpush([redisKey, ...ids]);
    return results;
  },

  async getCharacter(url) {
    // check cache for character
    const redisKey = url;
    const redisKeyExists = await redisClient.exists(redisKey);
    if (redisKeyExists == 1) {
      const redisValue = await redisClient.get(redisKey);
      return JSON.parse(redisValue);
    }
    // fetch character from API
    const response = await fetch(url);
    const json = await response.json();
    // store character in cache
    await redisClient.set(redisKey, JSON.stringify(json));
    return json;
  },

}