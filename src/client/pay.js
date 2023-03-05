// @ts-ignore
import { get, update} from "../../lib/actions"
import sendResponse from "../../lib/sendResponse";
import Iyzipay from 'iyzipay'
const iyzipay = new Iyzipay({
    apiKey: process.env.API_KEY,
    secretKey: process.env.SECRET_KEY,
    uri: process.env.URI
});

async function makepayment(event, context){
    const user = event.requestContext.authorizer.jwt.claims.username
    const {cardHolderName, cardNumber, expireMonth, expireYear, cvc} = JSON.parse(event.body);
    const {orderId} = event.pathParameters;
    const order_result = await get(process.env.ORDERS_TABLE, {id: orderId})
    const user_result = await get(process.env.CLIENT_TABLE, {email: user})

    //  Check for a unique order
    if(order_result.error){
        return sendResponse(501, {message: order_result.error.message})
    }
    if(!order_result.data){
        return sendResponse(404, {message: `order with id: ${orderId} not found`})
    }

    if(order_result.data.paid === 1){
        return sendResponse(200, {message: `order with id: ${orderId} is already paid for`})
    }
    // Check for a unique user
    if(!user_result){
        return sendResponse(404, {message: `user with email: ${user} not found`})
    }
    if(user_result.error){
        return sendResponse(501, {message: order_result.error.message})
    }

    // check if it has been paid for already
    

    const { cost, subject} = order_result.data
    const {firstname, phone, addressline, lastname} = user_result.data.profile
    // // process the payment
    
    const request = {
        locale: Iyzipay.LOCALE.TR,
        conversationId: '123456789',
        price: cost,
        paidPrice: cost + 0.5,
        currency: Iyzipay.CURRENCY.TRY,
        installment: '1',
        basketId: 'B67832',
        paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
        paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
        paymentCard: {
            cardHolderName,
            cardNumber,
            expireMonth,
            expireYear,
            cvc,
            registerCard: '0'
        },
        buyer: {
            id: 'BY789',
            name: lastname,
            surname: firstname,
            gsmNumber: phone,
            email: user,
            identityNumber: '74300864791',
            lastLoginDate: '2015-10-05 12:43:35',
            registrationDate: '2013-04-21 15:12:09',
            registrationAddress: addressline,
            ip: '85.34.78.112',
            city: 'Istanbul',
            country: 'Turkey',
            zipCode: '34732'
        },
        shippingAddress: {
            contactName: 'Jane Doe',
            city: 'Istanbul',
            country: 'Turkey',
            address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
            zipCode: '34742'
        },
        billingAddress: {
            contactName: 'Jane Doe',
            city: 'Istanbul',
            country: 'Turkey',
            address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
            zipCode: '34742'
        },
        basketItems: [
            {
                id: 'BI101',
                name: 'Binocular',
                category1: 'Collectibles',
                category2: 'Accessories',
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price: '0.3'
            },
            {
                id: 'BI102',
                name: 'Game code',
                category1: 'Game',
                category2: 'Online Game Items',
                itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
                price: '0.5'
            },
            {
                id: 'BI103',
                name: 'Usb',
                category1: 'Electronics',
                category2: 'Usb / Cable',
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price: '0.2'
            }
        ]
    };


    // iyzipay.payment.create(request, function (err, result) {
    //     console.log(err, result);
    // });
    const params = {
        TableName: process.env.ORDERS_TABLE,
        Key: {id : orderId},
        UpdateExpression: 'set #paid = :true',
        ExpressionAttributeValues: {
            ':true' : 1,
        },
        ExpressionAttributeNames: {
            '#paid' : 'paid'
        }
      }
      
    try{
        await iyzipay.payment.create(request)
        await update(params)
    return sendResponse(200, {message: `order with id: ${orderId} is successfully paid for`})
    }catch(err){
        console.error(err)
        return sendResponse(501, {message: err})
    }
}

export const handler = makepayment