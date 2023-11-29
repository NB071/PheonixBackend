// Custom error handling to be sent when the request fails

function errorHandler(err, _req, res, _next) {
  console.log(err.stack);
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
}

module.exports = errorHandler;
