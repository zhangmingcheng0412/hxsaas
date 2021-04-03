import request from "@/utils/request";



export async function switchProject(params) {
    return request('/api/principal/selectProject',{
        method:'POST',
        params
        /*data: {
            batchId:1
        },*/
    })
}