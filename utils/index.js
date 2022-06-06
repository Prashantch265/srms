const { SuccessResponse, ErrorResponse } = require("./response");
const { logger } = require("./logger");
const util = require("util");
const fs = require('fs');

const successResponse = (status, data, message, source) => {
  if (!data) throw new Error(`Data required to send response to client`);
  if (!status) throw new Error(`http code not found`);

  const SUCCESS = new SuccessResponse();
  SUCCESS.source = source;
  SUCCESS.data = data;
  SUCCESS.message = message;

  return SUCCESS;
};

const errorResponse = (status, message, source) => {
  if (!status) throw new Error(`http code not found`);
  if (!message) throw new Error(`Message Required to send to client`);

  const error = new ErrorResponse();
  error.status = status;
  error.message = message;
  error.source = source;

  return error;
};

const isEmpty = (value) => {
  if (value === null) {
    return true;
  } else if (typeof value !== "number" && value === "") {
    return true;
  } else if (value === "undefined" || value === undefined) {
    return true;
  } else if (
    value !== null &&
    typeof value === "object" &&
    !Object.keys(value).length
  ) {
    return true;
  } else {
    return false;
  }
};

const isIterable = (value) => {
  return Symbol.iterator in Object(value);
};

const write = (message) => {
  logger.info(message.substring(0, message.lastIndexOf("\n")));
};

const formattedMsg = (err, errorMsg) => {
  return err.source
    ? util.format(errorMsg[err.message], ...(typeof err.source === 'string' ? [err.source] : err.source))
    : errorMsg[err.message];
}

const deleteFile = async (path) => {
  await fs.unlink(path, function (err) {
    if (err) console.log(err);
  });
  return;
};

const pathToRegExp = path => {
  const pattern = path
    // Escape literal dots
    .replace(/\./g, '\\.')
    // Escape literal slashes
    .replace(/\//g, '/')
    // Escape literal question marks
    .replace(/\?/g, '\\?')
    // Ignore trailing slashes
    .replace(/\/+$/, '')
    // Replace wildcard with any zero-to-any character sequence
    .replace(/\*+/g, '.*')
    // Replace parameters with named capturing groups
    .replace(/:([^\d|^\/][a-zA-Z0-9_]*(?=(?:\/|\\.)|$))/g, (_, paramName) => `(?<${paramName}>[^\/]+?)`)
    // Allow optional trailing slash
    .concat('(\\/|$)');
  return new RegExp(pattern, 'gi');
};

const match = (path, url) => {
  const expression = path instanceof RegExp ? path : pathToRegExp(path);
  const match = expression.exec(url) || false;

  const matches = path instanceof RegExp ? !!match : !!match && match[0] === match.input;
  return matches;
};

const cookieExtractor = function(req) {
  let token;
  if (req && req.cookies) token = req.cookies['AuthToken'];
  return token;
};


module.exports = { successResponse, errorResponse, isEmpty, isIterable, write, formattedMsg, deleteFile, match, cookieExtractor };
