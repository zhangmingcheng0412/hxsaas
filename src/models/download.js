import {downloadTemplate} from '@/services/payment';
import {message} from 'antd'

// 文件下载
const DownloadMode = {
    namespace:'download',
    state:{},
    effects:{
        *download({payload,callback},{call}){
            // 下载模板返回的结果
            const response = yield call(downloadTemplate,payload)
            debugger
            if (response instanceof Blob){
                if (callback && typeof callback === 'function'){
                    callback(response)
                    message.success('正在下载....')
                }else {
                    message.error('下载失败，请重新下载',)
                }
            }
        }
    },
    reducers:{

    }


}
export default DownloadMode