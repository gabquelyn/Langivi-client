import {get} from '../../lib/actions'
import sendResponse from '../../lib/sendResponse';
const yourorder = async (event) => {
    const {orderId} = event.pathParameters;
    const order_result = await get(process.env.ORDERS_TABLE, { id: orderId });
    if(!order_result.data){
        return sendResponse(404, {message: "order does not exist"})
    }
    if(order_result.error){
        console.error(err)
        return sendResponse(502, {err})
    }

    const {cost, subject, target_lang, source_lang} = order_result.data
    return sendResponse(200, {message: {cost, subject, source_lang, target_lang}})

}
export const handler = yourorder;