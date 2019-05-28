/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  'GET /movies': {
    controller: 'MovieController',
    action: 'list',
    swagger: {
      summary: 'Movies list',
      description: 'Get the list of Star Wars movies.',
    }
  },

  'GET /movie/:id/characters': {
    controller: 'MovieController',
    action: 'characters',
    swagger: {
      summary: 'Movie characters',
      description: 'Get the list of characters in a movie.',
      parameters: [
        {
          in: 'query',
          name: 'genderFilter',
          required: false,
          type: 'string',
          description: 'Filter characters by gender: male, female, hermaphrodite or n/a.'
        },
        {
          in: 'query',
          name: 'sortBy',
          required: false,
          type: 'string',
          description: 'Sort characters by: name, gender or height.'
        },
        {
          in: 'query',
          name: 'orderBy',
          required: false,
          type: 'string',
          description: 'Order characters in: asc or desc.'
        },
      ],
    },
  },

  'GET /movie/:id/comments': {
    controller: 'CommentController',
    action: 'list',
    swagger: {
      summary: 'Movie comments',
      description: 'Get the list of comments on a movie.',
    }
  },

  'POST /comment': {
    controller: 'CommentController',
    action: 'create',
    swagger: {
      summary: 'Create comment',
      description: 'Comment on a movie.',
      body: {
        movieId: { type: 'integer', required: true },
        comment: { type: 'string', required: true, maxLength: 500 },
      },
    }
  },

};
