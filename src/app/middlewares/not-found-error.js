const { NotFoundError } = require('../../utils/api-errors');

/**
 *
 * @param req
 * @param res
 */
module.exports = (req, _res) => {
  const errorMessage = `Không tìm thấy: [${req.method}] - ${req.url}`;
  throw new NotFoundError(errorMessage);
};
