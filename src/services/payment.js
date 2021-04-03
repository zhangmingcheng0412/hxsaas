import request from "@/utils/request";



// 确认代发更改状态
export async function getConfirmTollBatch (params) {
    return request('/api/toll/confirmTollBatch',{
        method:'Post',
        data:params
    })
}

// 支付页面查询
export async function getBatchPayVo(params){
    return request('/api/toll/getBatchPayVo',{
        method:'GET',
        params,
    })
}

// 分页查询代发批次
export async function getBatchData(params){
    return request('/api/toll/pageBatch',{
        method:'GET',
        params
    })
}

// 分页查询代发流水
export async function getOrderData(params){
    return request('/api/toll/pageOrder',{
        method:'GET',
        params
    })
}

// 下载Excel文件模板
export async function downloadTemplate(params){
    return request('/api/toll/importExcelTemplate',{
        method:'GET',
        data:params,
        responseType:'blob' //返回二进制流
    })
}

// 导入Excel文件
export async function upLoadList(params){
    return request('/api/toll/importExcel',{
        method:'POST',
        data:params
    })
}
