const AWS = require('aws-sdk'); // Load the AWS SDK for Node.js
const {logFunHP} = require('./support_functions')
AWS.config.update({region: process.env.REGION}); // Set the region 

// const sqs = new AWS.SQS(); // didn't work outside of the function in aws-sdk-mock tests
// const sns = new AWS.SNS(); // didn't work outside of the function in aws-sdk-mock tests

const sendMessage = async (parameters) => {
  const sqs = new AWS.SQS(); // Create an SQS service object
  const response = await sqs.sendMessage(parameters).promise();
  logFunHP(sendMessage);
  return response
};

const publishMessage = async (parameters) => {
  const sns = new AWS.SNS(); // Create an SNS service object
  const response = await sns.publish(parameters).promise();
  logFunHP(publishMessage);
  return response
}
module.exports = {
  sendMessage,
  publishMessage
};