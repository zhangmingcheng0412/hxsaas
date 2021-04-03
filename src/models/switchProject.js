import {switchProject} from "@/services/switchProject";


const SwitchProjectMode = {
    namespace:'switchProject',
    state:{

    },
    effects:{
        *list({payload},{call,put}){
            // 后期切换项目更改 暂时默认1
            const response = yield call(switchProject,1)
            // debugger
            console.log(response)
            yield put()
        }
    },
    reducers:{
      projectName(state,payload){
          return{
              ...state,
              data:payload
          }
      }
    },
}

export default SwitchProjectMode