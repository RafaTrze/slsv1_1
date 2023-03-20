const logger = require('../utils/logger'); // import logger
const {errorhandler} = require('../utils/errorhandler'); 
const {bodyParser, logEventHP} = require('../utils/support_functions')
const {sendMessage} = require('../utils/aws_functions')

const lambda2SQS = async (event) => {
  try {
    logEventHP(event); // happy path log

    if (!event.body) {
      const error = new Error('Incorrect input! Please include phone number and message.');
      error.status = 400;
  
      return errorhandler(error);
    };

    const body = bodyParser(event.body); // parse the body of the event
    
    if (!body.message || !body.phoneNumber) {
      const error = new Error('Incorrect input! Please include phone number and message.');
      error.status = 400;
  
      return errorhandler(error);
    };

    const queueUrl = process.env.QUEUE_URL; // import path from env
    const params = {
      MessageBody: JSON.stringify(body), // sqs only accepts strings
      QueueUrl: queueUrl, // url of the target queue
      DelaySeconds: 2 // delay
    };
    
    const res = await sendMessage(params)
    logger.info({response: res}, '200'); // happy path log

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'message sent to the queue!',
        res,
      })
    };
    
  } catch (error) {
    return errorhandler(error);
  };
};


module.exports = {
  handler: lambda2SQS
};