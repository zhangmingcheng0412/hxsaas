import {getConfirmTollBatch} from '@/services/payment';
import {history} from "umi";

const TestMode = {
    namespace: 'test',
    state: {
        lastId: '',
    },
    effects: {
        * lastIdData({payload}, {call, put}) {
            debugger
            const response = yield call(getConfirmTollBatch, payload)
            console.log(response)
            if (response.code === 1000) {
                console.log(111)
                history.replace('/payment/pay-confirm')
            }

            yield put({
                type: 'save',
                payload: response,
            })
            debugger
        }
    },
    reducers: {
        save(state, {payload}) {
            return {
                ...state,
                lastId: payload.data,
            }
        }
    }
}
export default TestMode