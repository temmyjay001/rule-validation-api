module.exports.whatIsIt = (object) => {
  var stringConstructor = "test".constructor;
  var arrayConstructor = [].constructor;
  var objectConstructor = {}.constructor;
  if (object === null) {
    return false;
  }
  if (object === undefined) {
    return false;
  }
  if (object.constructor === stringConstructor) {
    return "String";
  }
  if (object.constructor === arrayConstructor) {
    return "Array";
  }
  if (object.constructor === objectConstructor) {
    return "Object";
  }
  {
    return false;
  }
};

module.exports.checkConditon = (field, condition, value) => {
  switch (condition) {
    case "eq":
      return field === value;
      break;
    case "neq":
      return field !== value;
      break;
    case "gt":
      return field > value;
      break;
    case "gte":
      return field >= value;
      break;
    case "contains":
      return field.includes(value);
      break;
    default:
      return "Condition not accepted.";
  }
};

module.exports.checkPayload = (payload, expected) => {
  for (const property in payload) {
    if (!expected.hasOwnProperty(property)) return 0;
  }
  return true;
};

module.exports.expectedPayLoad = () => {
  return {
    rule: {
      field: "",
      condition: ["eq", "neq", "gt", "gte", "contains"],
      condition_value: "",
    },
    data: "",
  };
};

module.exports.isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

module.exports.processResponseValidation = (validations, field, status) => {
  return {
    validations: {
      error: status,
      field: validations["rule"]["field"],
      field_value:
        field.length > 1
          ? validations["data"][field[0]][field[1]]
          : validations["data"][field[0]],
      condition: validations["rule"]["condition"],
      condition_value: validations["rule"]["condition_value"],
    },
  };
};
