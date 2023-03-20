const logger = require('../utils/logger'); // import logger
const {errorhandler} = require('../utils/errorhandler'); 
const {bodyParser, logEventHP} = require('../utils/support_functions')
const {publishMessage} = require('../utils/aws_functions')

const sqs2SNS = async (event) => {
  try {
    logEventHP(event); // happy path log
    const body = bodyParser(event.Records[0].body); // parse the body of the event
    const paramsMessage = {
      Message: body.message,
      PhoneNumber: body.phoneNumber
    };

    const res = await publishMessage(paramsMessage); // send text message via sns
    logger.info({response: res}, '200'); // happy path log
  
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'success',
        res
      })
    };
    
  } catch(error) {
    return errorhandler(error); 
  };
};

module.exports = {
  handler: sqs2SNS
};