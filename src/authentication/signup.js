import AWS from "aws-sdk";
import sendResponse from "../../lib/sendResponse";
import { put } from "../../lib/actions";
const cognito = new AWS.CognitoIdentityServiceProvider();
const tableName = process.env.CLIENT_TABLE;
const UserPoolId = process.env.USER_POOL_ID;

async function signup(event, context) {
  const { firstname, lastname, phone, email, password } = JSON.parse(
    event.body
  );
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
    projects: [],
    authToken: "null",
    password,
  };

  try {
    const response = await cognito.adminCreateUser(params).promise();
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
}

export const handler = signup;
