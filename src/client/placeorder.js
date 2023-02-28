import sendResponse from "../../lib/sendResponse";
import multipart from "lambda-multipart-parser";
import {v4 as uuid} from 'uuid'
import AWS from 'aws-sdk'
import { put } from "../../lib/actions";
const S3 = new AWS.S3()
async function createOrder(event, context) {
  const user = event.requestContext.authorizer.jwt.claims.username;
  const result = await multipart.parse(event);
  const createdAt = new Date().toISOString();
  const filetype = result.files[0].contentType;
  const filename = result.files[0].filename;
  const filecontent = result.files[0].content;
  const source = result.source;
  const due_date = result.dueDate;
  const target = result.target;
  const subject = result.subject;
  const cost = result.cost;
  const word_count = result.word_count;
  const services = JSON.parse(result.services);
  try {
    await S3.putObject({
      Bucket: process.env.CLIENT_BUCKET,
      Key: `clientdocuments/${filename}`,
      Body: filecontent,
      ContentType: filetype,
    }).promise();
  } catch (err) {
    console.error(err)
    return sendResponse(502, {message: err.message})
  }
  const fileurl = `https://${process.env.CLIENT_BUCKET}.s3.amazonaws.com/clientdocuments/${filename}`
  const order_details = {
    id: uuid(),
    owner: user,
    source,
    target,
    subject,
    services,
    cost,
    word_count,
    services,
    createdAt,
    due_date,
    translator: 'null',
    paid: 0,
    proofreader: 'null',
    standing: 'okay',
    fileurl,
    translator_file_url : "null",
    proofreader_file_url : "null"
  };
  
  const response = await put(process.env.ORDERS_TABLE, order_details)
  if(response.error){
    return sendResponse(501, {message: response.error.message})
  }

  return sendResponse(200, {message: `order created succesfully with id: ${order_details.id}`});
}

export const handler = createOrder;
