const { checkPayload, expectedPayLoad, isEmpty } = require("../utils/fn");
const { response } = require("../utils/response");

module.exports.checkpayload = () => {
  return async (req, res, next) => {
    if (!isEmpty(req.body)) {
      if (!checkPayload(req.body, expectedPayLoad())) {
        res.status(400).json(response("Invalid JSON payload passed."));
      } else next();
    } else
      res.status(404).json({
        message: "Request data required",
        success: "error",
        data: null,
      });
  };
};
