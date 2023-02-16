import AWS from "aws-sdk";
const cognito = new AWS.CognitoIdentityServiceProvider();
const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.CLIENT_TABLE;
const UserPoolId = process.env.USER_POOL_ID;

async function signup(event, context) {
  const { firstname, lastname, phone, email, password } = JSON.parse(
    event.body
  );
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

  const paramsForSetPass = {
    Password: password,
    UserPoolId,
    Username: email,
    Permanent: true,
  };

  const _params = {
    UserPoolId,
    Username: email,
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
    password,
    token: "null",
  };

  try {
    const response = await cognito.adminCreateUser(params).promise();
    if (response.User) {
    //   await cognito.adminCreateUser(_params).promise();
    //   await cognito.adminSetUserPassword(paramsForSetPass).promise();
    //   await dynamodb
    //     .put({
    //       TableName: tableName,
    //       Item,
    //     })
    //     .promise();
    return{
        statusCode: 201,
        body: JSON.stringify({message: "Created a new user!"})
    }
    }
  } catch (err) {
    console.error(err);
    return {
      statusCode: 501,
      body: JSON.stringify({
        message: "Something wnet wrong",
        error: err.stack,
      }),
    };
  }
}

export const handler = signup;
