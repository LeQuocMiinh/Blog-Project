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
      message: error.message,
      status: false,
    });
  }

  if (error != '') {
    return res.status(400).send({
      message: "Đã có lỗi xảy ra, hãy kiểm tra lại các tham số trong Request Body,...!",
      status: false,
    });
  }

  // connect all errors
  return res.status(400).send({
    message: error,
    status: false,
  });
};
