import AWS from 'aws-sdk'
import sendResponse from '../../lib/sendResponse';
const sqs = new AWS.SQS();
async function contact(event, context){
 const {name, email, number, message} = JSON.parse(event.body);
 const email_params = {
    QueueUrl: process.env.MAIL_QUEUE_URL,
    MessageBody: JSON.stringify({
        subject: `${name} @${email}`,
        body: `${message}______ reach me: ${number}`,
        recipient: 'info@languvi.com'
    })
}
    await sqs.sendMessage(email_params).promise()
    return sendResponse(200, {message: "Message delivered successfully!"})
}
export const handler = contact