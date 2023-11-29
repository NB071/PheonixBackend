// custom try catch statement

function tryCatch(controller) {
  return async (req, res, next) => {
    try {
      await controller(req, res);
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = tryCatch;
