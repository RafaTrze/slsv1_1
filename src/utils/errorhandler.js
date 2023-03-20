const logger = require('./logger');

const errorhandler = (error) => {
  logger.error(error);
  
  if (!error.status || !error.message) {
    error.message = 'internal server error! try again later.';
    error.status = 500;
  };

  logger.info({return: {
    statusCode: error.status,
    bodyMessage: error.message}
  });
  
  return {
    statusCode: error.status,
    body: JSON.stringify({
      message: error.message
    })
  };  

};

module.exports = {
  errorhandler
};