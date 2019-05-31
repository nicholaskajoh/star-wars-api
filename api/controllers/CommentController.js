const fetch = require('node-fetch');

module.exports = {
  
  async create(req, res) {
    try {
      const { movieId, comment } = req.body;
      const movie = await MovieService.getMovie(movieId);
      if (!movie) return res.status(404).json({ message: 'Movie not found.' });

      const commentObject = await Comment.create({ movieId, comment, publicIp: req.ip });
      return res.status(201).json({ message: 'Comment created sucessfully.', data: commentObject });
    } catch (err) {
      return res.status(400).json({ message: err.details });
    }
  },

  async list(req, res) {
    try {
      const movieId = req.params.id;
      const movie = await MovieService.getMovie(movieId);
      if (!movie) return res.status(404).json({ message: 'Movie not found.' });

      const comments = await Comment.find({ movieId }).sort('createdAt DESC');
      return res.status(200).json({ message: 'Comment retrieved sucessfully.', data: comments });
    } catch (err) {
      return res.status(400).json({ message: err.details });
    }
  }

}