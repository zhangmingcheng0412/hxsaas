import {upLoadList} from "@/services/payment";
import {history} from "umi";
import {message} from "antd";


// 文件上传
const UpLoadListMode = {
    namespace:'list',
    state:{
        data:""
    },
    effects:{
        *upload({payload,callback},{call,put}){
            const response = yield call (upLoadList,payload)
            debugger
            console.log(response)
            if (callback && response.code===1000){

                message.success('上传成功')
                // 上传成功后跳转到支付详情页

                history.replace('/payment/pay-page');
            }
            // debugger
            yield put({
                type:'save',
                payload:response.data,
            })

        }
    },
    reducers:{
        save(state,{payload}){
            // debugger
            return{
                ...state,
                data:payload
            }
        }
    }
}

export default UpLoadListMode
