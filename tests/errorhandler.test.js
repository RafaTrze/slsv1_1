const logger = require('../src/utils/logger');
const {errorhandler} = require('../src/utils/errorhandler')

describe('testing of the errorhandler', () => {
  
  let error1 = {};
  let error2 = {};
  let error3 = {};
  let error4 = {};
  
  beforeAll(() => {
    logger.info('testing errorhandler...')
    
    error1 = {
      level: "info",
      type: "Error",
      message: "fuubar",
      stack: "Error: Incorrect input! Please include phone number and message.\n    at Runtime.sendMessage [as handler] (/var/task/src/handlers/lambda2sqs.js:22:21)\n    at Runtime.handleOnceNonStreaming (file:///var/runtime/index.mjs:1085:29)",
      status: 400,
      msg: "fuubar2"
    };
  
    error2 = {
      level: "info",
      type: "Error",
      message: "fuubar",
      stack: "Error: Incorrect input! Please include phone number and message.\n    at Runtime.sendMessage [as handler] (/var/task/src/handlers/lambda2sqs.js:22:21)\n    at Runtime.handleOnceNonStreaming (file:///var/runtime/index.mjs:1085:29)",
      msg: "fuubar2"
    };
  
    error3 = {
      level: "info",
      type: "Error",
      message: "",
      stack: "Error: Incorrect input! Please include phone number and message.\n    at Runtime.sendMessage [as handler] (/var/task/src/handlers/lambda2sqs.js:22:21)\n    at Runtime.handleOnceNonStreaming (file:///var/runtime/index.mjs:1085:29)",
      status: 400,
      msg: "fuubar2"
    };
  
    error4 = {
      level: "info",
      type: "Error",
      stack: "Error: Incorrect input! Please include phone number and message.\n    at Runtime.sendMessage [as handler] (/var/task/src/handlers/lambda2sqs.js:22:21)\n    at Runtime.handleOnceNonStreaming (file:///var/runtime/index.mjs:1085:29)",
      status: 400,
      msg: "fuubar2"
    };
  
  });

  afterAll(() => {
    logger.info("finished testing errorhandler")
  
    error1 = {};
    error2 = {};
    error3 = {};
    error4 = {};
  });
  
  test('errorhandler message+status', () => {
    expect(errorhandler(error1)).toEqual(
      expect.objectContaining({
        statusCode: 400,
        body: expect.any(String)
      })
    );
  });

  test('errorhandler message without status', () => {
    expect(errorhandler(error2)).toEqual(
      expect.objectContaining({
        statusCode: 500,
        body: "{\"message\":\"internal server error! try again later.\"}"
      })
    );
  });

  test('errorhandler status with empty string message ', () => {
    expect(errorhandler(error3)).toEqual(
      expect.objectContaining({
        statusCode: 500,
        body: "{\"message\":\"internal server error! try again later.\"}"
      })
    );
  });

  test('errorhandler status with empty key message ', () => {
    expect(errorhandler(error4)).toEqual(
      expect.objectContaining({
        statusCode: 500,
        body: "{\"message\":\"internal server error! try again later.\"}"
      })
    );
  });

  afterAll(() => {
    logger.info("finished testing errorhandler")
  
    error1 = {};
    error2 = {};
    error3 = {};
    error4 = {};
  });
});

