const fetch = require('node-fetch');

module.exports = {
  
  async list(req, res) {
    try {
      let movies = [];

      const response = await fetch('https://swapi.co/api/films', { method: 'GET' });
      const json = await response.json();
      const results = json.results;

      // sort movies by release date from earliest to newest
      results.sort((movieA, movieB) => {
        const dateA = new Date(movieA.release_date);
        const dateB = new Date(movieB.release_date);
    
        if (dateA < dateB) {
          return -1;
        } else if (dateA == dateB) {
          return 0;
        } else {
          return 1;
        }
      });

      for (let i = 0; i < results.length; i++) {
        const { title, opening_crawl: openingCrawl } = results[i];
        // TODO: use group by + count to fetch comment counts for all movies at once
        const commentsCount = await Comment.count({ movieId: results[i].episode_id });
        movies.push({ title, openingCrawl, commentsCount });
      }

      return res.status(200).json({ message: 'Movies retrieved sucessfully.', data: movies });
    } catch (err) {
      return res.status(400).json({ message: err.details });
    }
  },

};