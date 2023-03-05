import AWS from "aws-sdk";
import sendResponse from "../../lib/sendResponse";
import { put } from "../../lib/actions";
const cognito = new AWS.CognitoIdentityServiceProvider();
const sqs = new AWS.SQS();
const tableName = process.env.CLIENT_TABLE;
const UserPoolId = process.env.USER_POOL_ID;
import token from "../../lib/accessToken";
async function signup(event, context) {
  const { firstname, lastname, phone, email, password } = JSON.parse(
    event.body
  );
  const accessToken = token(5)
  let result;
  const params = {
    UserPoolId,
    Username: email,
    MessageAction: "SUPPRESS",
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
    ],
  };

  const Item = {
    email,
    profile: {
      firstname,
      lastname,
      phone,
      addressline: "null",
      country: "null",
      nativelanguage: "null",
      image: "null",
    },
    authToken: accessToken,
  };

  const _params = {
    Password: password,
    UserPoolId: process.env.USER_POOL_ID,
    Username: email,
    Permanent: true
}

  try {
    const response = await cognito.adminCreateUser(params).promise();
    await cognito.adminSetUserPassword(_params).promise();
    result = response;
  } catch (err) {
    console.error(err);
    return sendResponse(501, {
      message: "Soomething went wrong!",
      error: err.stack,
    });
  }

  if (result.User) {
    const result = await put(tableName, Item);
    if (result.error) {
      return sendResponse(501, { message: "Something went wrong!" });
    }
  }

  const email_params = {
    QueueUrl: process.env.MAIL_QUEUE_URL,
    MessageBody: JSON.stringify({
        subject: 'Verify your email address',
        body: `Your email verification code is ${accessToken}, it expires in 10 minutes`,
        recipient: email
    })
}

try{
  const output = await sqs.sendMessage(email_params).promise()
  console.log(output);
}catch(err){
  console.error(err)
  return sendResponse(501, {messgae: err.message});
}

}

export const handler = signup;
