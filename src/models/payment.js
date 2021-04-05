import {getBatchData, upLoadData, getOrderData, getBatchById, getConfirmTollBatch} from '@/services/payment';
import {message} from "antd";
import {history} from "umi";


const PaymentMode = {
    namespace: 'payment',
    state: {
        batchId: '',
    },
    effects: {

        // 获取查询代发批次数据
        * pageBatch({payload, callback}, {call, put}) {
            const response = yield call(getBatchData, payload);

            if (callback) callback(response) // 返回的结果通过参数带过去
        },
        // 文件上传数据 返回结果是一个 batchId
        * upload({payload, callback}, {call, put}) {
            const response = yield call(upLoadData, payload)


            if (callback && response.code === 1000) {

                message.success('上传成功')

                // 上传成功后跳转到支付详情页
                history.replace('/payment/pay-page');
            }

            // 文件上传成功后保存id
            yield put({
                type: 'upDataBatchID',
                payload: response.data,  // 将返回的id传递给state更新
            })

        },

        // 分页查询代发流水
        * pageOrder({payload, callback}, {call, put}) {
            // const {batchId}  =payload
            const response = yield call(getOrderData, payload)
            // debugger
            if (callback) callback(response)
            yield put({
                type: 'upDataBatchID',
                payload: payload,  // 将返回的id传递给state更新
            })
            // debugger
        },


        // 根据id查询批次
        * batchById({payload, callback}, {call, put}) {
            const response = yield call(getBatchById, payload)
            if (callback && response.code === 1000) callback(response)
        },


        // 确认代发更改状态

        *confirmTollBatch({payload}, {call, put}) {
            debugger
            const response = yield call(getConfirmTollBatch, payload)
            console.log(response)
            if (response.code === 1000) {
                // 成功后调到支付页
                history.replace('/payment/pay-confirm')
            }
            yield put({
                type: 'upDataBatchID',
                payload: payload,  // 将返回的id传递给state更新
            })
        }

    },
    reducers: {
        upDataBatchID(state, {payload}) {
            debugger
            return {
                ...state,
                batchId: payload.batchId //id存起来
            }
        }
    }

}


export default PaymentMode