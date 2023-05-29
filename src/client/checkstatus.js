import util from "util";
import Iyzipay from "iyzipay";
import AWS from "aws-sdk";
// import sendResponse from "../../lib/sendResponse";
const dynamodb = new AWS.DynamoDB.DocumentClient();
const iyzipay = new Iyzipay({
  apiKey: process.env.API_KEY,
  secretKey: process.env.SECRET_KEY,
  uri: process.env.URI,
});

async function checkstatus(event, context) {
  const { conversationId } = event.pathParameters;
  const encodedString = event.body;
  const decodedString = Buffer.from(encodedString, "base64").toString("utf-8");
  const token_arr = decodedString.split("=");
  const token = token_arr[1];
  var request = {
    locale: Iyzipay.LOCALE.EN,
    conversationId,
    token,
  };

  function checkstatus(request, callback) {
    iyzipay.checkoutForm.retrieve(request, callback);
  }

  const promisifiedcheckStauts = util.promisify(checkstatus);

  let details;
  try {
    const result = await promisifiedcheckStauts(request);
    details = result;
    if (result.paymentStatus === "SUCCESS") {
      const update_params = {
        TableName: process.env.ORDERS_TABLE,
        Key: { id: conversationId },
        UpdateExpression: "SET standing = :s, paid = :t",
        ExpressionAttributeValues: {
          ":s": "unassigned translation",
          ":t": 1,
        },
      };
      await dynamodb.update(update_params).promise();

      const Item = {
        id: conversationId,
        ...result,
      };
      await dynamodb
        .put({ TableName: process.env.TRANSACTIONS_TABLE, Item })
        .promise();
    }
  } catch (err) {
    console.error({ error: err });
  }

  const htmlContent = `
  <html lang="en">
    <style>
      .container{
        background-color:  #fff;
        padding: 2rem;
        box-shadow: 0px 1px 2px rgba(0,0,0,0.3);
        overflow: hidden;
        border-radius: .5rem;
        color: #344054;
        width: 20rem;
        font-family: monospace;
        letter-spacing: 2px;
      }
      *{
        margin: 0;
        padding: 0;
      }
      body{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        overflow: hidden;
        text-transform: capitalize;
        background-color: #e6e6e6;
      }
      .li{
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
   
      .li > div{
        display: flex;
        justify-content: space-between;
      }

      .green{
        color: green;
  font-weight: bold;
        
      }
      .red{
        color: red
  font-weight: bold;

      }
    </style>
    
    <body>
      <div class="container">
        <div class="li">
          <div>
            <p>payment status: </p>
            <p class = ${
              details.paymentStatus === "SUCCESS" ? "green" : "red"
            }>${details.paymentStatus || "UNSUCCESSFUL"}</p>
          </div>
          <hr />
          <div>
            <p>card type : </p>
            <p>${details.cardType || "null"}</p>
          </div>
          <hr />
          <div>
            <p>paymentId: </p>
            <p>${details.paymentId || "null"}</p>
          </div>
          <hr />
          <div>
            <p>Last four digit : </p>
            <p>${details.lastFourDigits || "null"}</p>
          </div>
          <hr />
          <div>
            <p>Currency : </p>
            <p>${details.currency || "null"}</p>
          </div>
          <hr />
          <div>
            <p>Card association: </p>
            <p>${details.cardAssociation || "null"}</p>
          </div>
          <hr />
          <div>
            <p>Price: </p>
            <p>${details.price || "null"}</p>
          </div>
          <hr />
          <div>
            <p>Paid price: </p>
            <p>${details.paidPrice || "0"}</p>
          </div>
          <hr/>
        </div>
      </div>
      <script type="text/javascript">
      // Redirect after a timeout of 10 seconds (5000 milliseconds)
      setTimeout(function() {
        window.location.replace("https://languivi.netlify.app/auth");
      }, 10000);
    </script>
    </body>
  </html>
  `;

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html",
    },
    body: htmlContent,
  };
}

export const handler = checkstatus;
