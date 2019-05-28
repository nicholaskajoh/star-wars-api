module.exports = {
  autoCreatedAt: true,
  attributes: {
    movieId: {
      type: 'integer',
      required: true,
    },
    comment: {
      type: 'string',
      required: true,
      maxLength: 500,
    },
    publicIp: {
      type: 'string',
    },
    createdAt: {
      type: 'datetime',
    },
  },

  validationMessages: {
    comment: {
      required: 'The comment field is required',
      maxLength: 'Your comment cannot be more than 500 characters',
    },
  },
};
