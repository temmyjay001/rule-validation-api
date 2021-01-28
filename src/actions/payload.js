const { response } = require("../utils/response");
const {
  whatIsIt,
  checkConditon,
  expectedPayLoad,
  processResponseValidation,
} = require("../utils/fn");

class PayLoad {
  validate_rule(req, res) {
    let payload = req.body;

    for (const property in expectedPayLoad()) {
      if (!payload.hasOwnProperty(property))
        return res.status(400).json(response(`${property} is required.`));
    }

    const rule_required = ["field", "condition", "condition_value"];
    const condition_required = ["eq", "gt", "gte", "contains", "neq"];

    if (payload["rule"]) {
      if (whatIsIt(payload["rule"]) !== "Object")
        return res.status(400).json(response("rule should be an object."));

      for (let i = 0; i < rule_required.length; i++) {
        if (!payload["rule"].hasOwnProperty(rule_required[i]))
          return res
            .status(400)
            .json(response(`${rule_required[i]} is required.`));
        if (payload["rule"]["condition"]) {
          if (!condition_required.includes(payload["rule"]["condition"]))
            return res
              .status(400)
              .json(
                response(
                  `Condition ${payload["rule"]["condition"]} not allowed.`
                )
              );
        }
      }
    }

    if (payload["data"]) {
      if (whatIsIt(payload["data"]) === false)
        return res
          .status(400)
          .json(response("data should be a|an object, array or string."));

      if (payload["rule"]["field"]) {
        let field = payload["rule"]["field"].split(".");

        if (field.length > 1) {
          //since the nesting is fixed to two levels
          if (
            payload["data"].hasOwnProperty(field[0]) &&
            payload["data"][field[0]].hasOwnProperty(field[1])
          ) {
            let result = checkConditon(
              payload["data"][field[0]][field[1]],
              payload["rule"]["condition"],
              payload["rule"]["condition_value"]
            );
            if (result)
              return res
                .status(200)
                .json(
                  response(
                    `field ${payload["rule"]["field"]} successfully validated.`,
                    "success",
                    processResponseValidation(payload, field, false)
                  )
                );
            else
              return res
                .status(400)
                .json(
                  response(
                    `field ${payload["rule"]["field"]} failed validation.`,
                    null,
                    processResponseValidation(payload, field, true)
                  )
                );
          } else
            return res
              .status(400)
              .json(response(`field ${field} is missing from data.`));
        } else {
          if (payload["data"].hasOwnProperty(field)) {
            let result = checkConditon(
              payload["data"][field],
              payload["rule"]["condition"],
              payload["rule"]["condition_value"]
            );
            if (result)
              return res
                .status(200)
                .json(
                  response(
                    `field ${field[0]} successfully validated.`,
                    "success",
                    processResponseValidation(payload, field, false)
                  )
                );
            else
              return res
                .status(400)
                .json(
                  response(
                    `field ${field[0]} failed validation.`,
                    null,
                    processResponseValidation(payload, field, true)
                  )
                );
          } else
            return res
              .status(400)
              .json(response(`field ${field} is missing from data.`));
        }
      }
    }
  }
}

module.exports = new PayLoad();
