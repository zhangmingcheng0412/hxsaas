import {getOrderData} from '@/services/payment'

const OrderDataMode={
    namespace:'orderData',
    state:{
        data:[],
        totalMoneyNo:'',
        batchId:''
    },
    effects:{
        *getData({payload},{call,put}){
            // 取到返回给后台的参数
            const {totalMoneyNo,batchId}= payload;

            const response = yield call(getOrderData,{batchId}) //返回参数batchId
            // debugger
            if (response.code===1000){

                yield put({
                    type:'save',
                    payload:{
                        // 当前ID和金额
                        batchId,
                        totalMoneyNo,
                        // 请求返回的数据
                        data:response.data,
                    }
                })
            }


        }
    },
    reducers:{
        save(state, {payload}){
            return{
                ...state,
                data: payload.data,
                totalMoneyNo:payload.totalMoneyNo,
                batchId:payload.batchId
            }
        }
    }
}
export default OrderDataMode
