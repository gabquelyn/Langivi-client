async function profile(event, context){

  const user = event.requestContext.authorizer.jwt
  return {
    statusCode: 200,
    body: JSON.stringify({output: 'Authenticated user!', user}),
  };
}


export const handler = profile