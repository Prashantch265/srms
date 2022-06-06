class SuccessResponse {
  success = true;
  status;
  data = [];
  message;
  source;
}

class ErrorResponse {
  constructor(message, source) {
    this.message = message;
    this.source = source;
  }
  success = false;
  status;
  message;
  source;
}

module.exports = { SuccessResponse, ErrorResponse };
