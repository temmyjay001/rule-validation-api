module.exports.response = (message, status, data) => {
  return {
    message: message || null,
    status: status == null ? "error" : status,
    data: data || null,
  };
};
