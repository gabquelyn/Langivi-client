import { update } from "../../lib/actions";
import sendResponse from "../../lib/sendResponse";
import { uploadPictureToS3 } from "../../lib/uploadImage";

const tableName = process.env.CLIENT_TABLE
async function update_profile(event, context){
  const user = event.requestContext.authorizer.jwt.claims.username
  const profile = JSON.parse(event.body)


  if(profile.image.includes('data:image/') && profile.image.includes('base64')){
    const base64 = image.replace(/^data:image\/\w+;base64,/,'');
    const buffer = Buffer.from(base64, 'base64');
    try{
      const uploadtoS3Result = await uploadPictureToS3(user + '.jpg', buffer);
      imageUrl = uploadtoS3Result.Location;
      profile.image = imageUrl
      console.log(uploadtoS3Result);
    }catch(err){
      console.error(err)
      return sendResponse(501, {message: err.message})
    }
  }
  
  const params = {
    TableName: tableName,
    Key: {email: user},
    UpdateExpression: 'set #former_profile = :new_profile',
    ExpressionAttributeValues: {
        ':new_profile' : profile,
    },
    ExpressionAttributeNames: {
        '#former_profile' : 'profile'
    }
  }

  const result = await update(params)
  if(result.error){
    return sendResponse(404, {message: "User not found!"})
  }
  return {
    statusCode: 201,
    body: JSON.stringify({message: "Profile Updated Successfully!"}),
  };
}


export const handler = update_profile