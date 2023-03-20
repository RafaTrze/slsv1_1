const logger = require('./logger')

const logFunHP = (functionName) => {
  logger.info({functionName: functionName.name}, '200')
};

const logEventHP = (event) => {
  logger.info({event: event}, '200')
}

const bodyParser = (unparsedBody) => {
  const body = JSON.parse(unparsedBody);
  logFunHP(bodyParser)
  return body;
};

module.exports = {
  logFunHP,
  logEventHP,
  bodyParser
}