class HttpException extends Error {
  constructor(status, message, source) {
    super();
    this.status = status;
    this.message = message;
    this.source = source;
  }
  status;
}

module.exports = HttpException;
