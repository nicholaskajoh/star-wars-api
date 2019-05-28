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
