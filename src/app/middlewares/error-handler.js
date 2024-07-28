const { APIError } = require('../../utils/api-errors');

/**
 *
 * @param error
 * @param req
 * @param res
 * @param next
 */
module.exports = (error, req, res, _next) => {

  // catch api error
  if (error instanceof APIError) {
    return res.status(error.status).send({
      error: {
        code: error.status,
        message: error.message,
      },
    });
  }

  // connect all errors
  return res.status(500).send({
    error: {
      code: 500,
      message: 'Something went wrong!',
    },
  });
};
