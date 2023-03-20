const AWS = require('aws-sdk-mock');
const logger = require('../src/utils/logger');
const {sendMessage, publishMessage} =require('../src/utils/aws_functions');


describe('test aws_functions', () => {
  
  let bodyMock = {};
  let queueUrlMock = '';


  beforeAll(() => {
    bodyMock = {
      phoneNumber: '+117333444555',
      message: 'Oi'
    };
    queueUrlMock = 'https://sqs.eu-west-2.amazonaws.com/533322355631/rt-sqs-queue';
  });

  afterEach(() => {
    AWS.restore();
  });

  afterAll(() => {
    bodyMock = {};
    queueUrlMock = '';
  });

  test('send successful message to sqs', async () => {
    AWS.mock('SQS', 'sendMessage', (params, callback) => {
      expect(params).toEqual({
        MessageBody: JSON.stringify(bodyMock),
        QueueUrl: queueUrlMock,
      });
      callback(null, {
        ResponseMetadata: {
            RequestId: "081ef2c2-fc12-5864-bad5-ae4c7e5c3111"
        },
        MD5OfMessageBody: "d7b2333de216b74538ab4560af349d11",
        MessageId: "111"
      });
    });

    const paramsMock = {
      MessageBody: JSON.stringify(bodyMock), // sqs only accepts strings
      QueueUrl: queueUrlMock // url of the target queue
    };
    const resMock = await sendMessage(paramsMock);
    expect(resMock).toEqual({
      ResponseMetadata: {
        RequestId: expect.any(String)
      },
      MD5OfMessageBody: expect.any(String),
      MessageId: expect.any(String)
    });
  });

  test('send succesfull sns message', async () => {
    AWS.mock('SNS', 'publish', {
      ResponseMetadata: {
        RequestId: "5bd0f195-8b86-5e25-a075-ad1b09d7e5bb"
      },
      MessageId: "50228546-6871-5262-ad9e-d9c8ea201911"
    });

    const paramsMock = {
      Message: bodyMock.message,
      PhoneNumber: bodyMock.phoneNumber
    }
    const resMock = await publishMessage(paramsMock)
    expect(resMock).toEqual({
      ResponseMetadata: {
        RequestId: expect.any(String)
      },
      MessageId: expect.any(String)
    });
  });

});
