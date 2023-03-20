const logger = require('../src/utils/logger');
const {bodyParser} = require('../src/utils/support_functions');

describe("testing bodyParser and empty if (key-value pair) statements", () => {
  
  const emptyKeyValue = (emptyKeyValue) => {
    if (!emptyKeyValue.phoneNumber || !emptyKeyValue.message) {
       return true
     } else {
       return false
     }
  } 
  
  let unparsedBody = "";
  let bodyEmptyMessage = {};
  let bodyEmptyPhoneNumber = {};
  let bodyEmptyValuePhoneNumber = {};
  let bodyEmptyValueMessage = {};
  
  beforeAll(() => {
    logger.info('testing support_functions...')
    unparsedBody = "{\n    \"phoneNumber\": \"+447490000358\",\n  " +
    "  \"message\": \"This is message from AWS SNS service on belhaf of " +
    " Mr. Corwin - 'All roads lead to Amber'\"\n}";
  
    parsedBody = {
      phoneNumber: '+44749000008',
      message: 'some message'
    };
  
    bodyEmptyMessage = {
      phoneNumber: '111111',
    };
  
    bodyEmptyPhoneNumber = {
      message: 'some message'
    };
  
    bodyEmptyValueMessage = {
      phoneNumber: '+447400000358',
      message: ''
    };  
  
    bodyEmptyValuePhoneNumber = {
      phoneNumber: '',
      message: 'some message'
    };  
  });

  afterAll(() => {
    logger.info('finished testing support_functions')
  
    unparsedBody = "";
    bodyEmptyMessage = {};
    bodyEmptyPhoneNumber = {};
    bodyEmptyValuePhoneNumber = {};
    bodyEmptyValueMessage = {};
  });

  test('bodyParser - parse the unparsed object', () => {
    expect(bodyParser(unparsedBody)).toEqual(
      expect.objectContaining({
        phoneNumber: expect.any(String),
        message: expect.any(String)
      })
    )
  });

  test('for empty keys', () => {
   expect(emptyKeyValue(bodyEmptyMessage)).toBe(true)
  });

  test('for empty keys', () => {
    expect(emptyKeyValue(bodyEmptyPhoneNumber)).toBe(true)
  });

  test('for empty values', () => {
    expect(emptyKeyValue(bodyEmptyValueMessage)).toBe(true)
  });

  test('for empty values', () => {
    expect(emptyKeyValue(bodyEmptyValuePhoneNumber)).toBe(true)
  });
});





