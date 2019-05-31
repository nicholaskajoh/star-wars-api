const fetch = require('node-fetch');

module.exports = {
  
  async list(req, res) {
    try {
      const response = await fetch('https://swapi.co/api/films');
      const json = await response.json();
      const results = json.results;

      // sort movies by release date from earliest to newest
      results.sort((movieA, movieB) => {
        const dateA = new Date(movieA.release_date);
        const dateB = new Date(movieB.release_date);
    
        if (dateA < dateB) return -1;
        else if (dateA == dateB) return 0;
        else return 1;
      });

      const movies = await Promise.all(results.map(async (movie) => {
        const { title, opening_crawl: openingCrawl } = movie;
        // TODO: use SQL group by + count to fetch comment counts for all movies at once
        const commentsCount = await Comment.count({ movieId: movie.episode_id });
        return { title, openingCrawl, commentsCount };
      }));

      return res.status(200).json({ message: 'Movies retrieved sucessfully.', data: movies });
    } catch (err) {
      return res.status(400).json({ message: err.details });
    }
  },

  async characters(req, res) {
    try {
      const movieId = req.params.id;
      const response = await fetch(`https://swapi.co/api/films/${movieId}`);
      const json = await response.json();
      if (json.hasOwnProperty('detail') && json.detail == 'Not found') {
        return res.status(404).json({ message: 'Movie not found.' });
      }
      const allCharacterUrls = json.characters;
      // get all characters
      const allCharacters = await Promise.all(allCharacterUrls.map(async (url) => {
        const charRes = await fetch(url);
        const char = await charRes.json();
        return char;
      }));

      const { sortBy, orderBy, genderFilter } = req.query;

      // filter characters by gender
      const characters = genderFilter
        ? allCharacters.filter(character => character.gender == genderFilter)
        : allCharacters;

      // sort characters (in ascending order)
      const categories = ['name', 'gender', 'height'];
      if (sortBy && categories.includes(sortBy)) {
        characters.sort((charA, charB) => {
          const propA = String(charA[sortBy]).toLowerCase();
          const propB = String(charB[sortBy]).toLowerCase();
          if (propA < propB) return -1;
          if (propA > propB) return 1;
          return 0;
        });
      }

      // order characters
      if (orderBy && orderBy == 'desc') {
        characters.reverse();
      }

      const totalHeightOfCharactersCm = characters.reduce((total, character) => {
        return total + Number.parseInt(character.height);
      }, 0);
      const meta = {
        totalNumberOfCharacters: characters.length,
        totalHeightOfCharactersCm,
        totalHeightOfCharactersFt: totalHeightOfCharactersCm / 30.48,
        totalHeightOfCharactersIn: totalHeightOfCharactersCm / 2.54,
      };
      return res.status(200).json({
        message: 'Characters retrieved sucessfully.', data: characters, meta,
      });
    } catch (err) {
      return res.status(400).json({ message: err.details });
    }
  },

};