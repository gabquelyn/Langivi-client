import sendResponse from "../../lib/sendResponse";
import multipart from "lambda-multipart-parser";
import AWS from 'aws-sdk'
import { put } from "../../lib/actions";
const S3 = new AWS.S3()
async function createOrder(event, context) {
  const user = event.requestContext.authorizer.jwt.claims.username;
  const result = await multipart.parse(event);
  const createdAt = new Date().toISOString();
  const source = result.source.toLowerCase();
  const due_date = result.dueDate;
  const target = result.target.toLowerCase();
  const subject = result.subject.toLowerCase();
  const cost = result.cost;
  const word_count = result.word_count;
  const plan = result.plan;
  const services = JSON.parse(result.services);
  const filekeys = [];
  function generateNodeId() {
    const timestamp = Date.now().toString(16); 
    return timestamp
  }
  
  // to save text files when there is text.
  if(result.text){
    const filename = generateNodeId() + user + ".txt";
    const params = {
      Bucket: process.env.CLIENT_BUCKET,
      Key: `clientdocuments/${filename}`,
      Body: result.text,
      ContentType: 'text/plain',
    }

    try{
      await S3.putObject(params).promise();
    }catch(error){
      console.error(error);
      return sendResponse(502, {message: error.message});
    }
    filekeys.push(filename);
  }
  

  // to loop through all the files. Expecting multiple files.
  for (const file of result.files) {
    const fileName = file.filename;
    const fileContent = file.content;
    const fileType = file.contentType;
  
    // Set up S3 upload parameters
    const uploadParams = {
      Bucket: process.env.CLIENT_BUCKET,
      Key: `clientdocuments/${fileName}`,
      Body: fileContent,
      ContentType: fileType
    };

    try{
      await S3.upload(uploadParams).promise();
    }catch(err){
      console.error(err);
      return sendResponse(502, {message: err.message})
    }
    filekeys.push(fileName);
  }
  
  // return sendResponse(200, {message: filekeys})

  
  const order_details = {
    id: generateNodeId(),
    catTools: false,
    owner: user,
    source_lang: source,
    target_lang: target,
    subject,
    services,
    cost,
    plan,
    word_count,
    services,
    createdAt,
    due_date,
    translator: 'null',
    paid: 0,
    proofreader: 'null',
    standing: 'okay',
    filekeys,
    translator_file_url : [],
    proofreader_file_url : [],
    translator_request: ""
  };
  
  const response = await put(process.env.ORDERS_TABLE, order_details)
  if(response.error){
    return sendResponse(501, {message: response.error.message})
  }

  return sendResponse(200, {message: `order created succesfully with id: ${order_details.id}`});
}

export const handler = createOrder;
