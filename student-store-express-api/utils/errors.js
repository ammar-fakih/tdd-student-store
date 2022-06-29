class ExpressError extends Error {
  constructor(message, status) {
    super();

    this.message = message;
    this.status = status;
  }
}

class BadRequestError extends ExpressError {
  constructor(message) {
    super();

    this.message = message || 'Bad Request';
    this.status = 400;
  }
}

class NotFoundError extends ExpressError {
  constructor(message) {
    super();

    this.message = message || 'Not Found';
    this.status = 404;
  }
}

module.exports = {
  BadRequestError,
  NotFoundError,
};
