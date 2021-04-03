import {stringify} from 'querystring';
import {history} from 'umi';
import {fakeAccountLogin} from '@/services/login';
import {setAuthority} from '@/utils/authority';
import {getPageQuery} from '@/utils/utils';
import {message} from 'antd';

const Model = {
    namespace: 'login',
    state: {
        status: undefined,
        username: '',
        phoneNumber:'',
    },
    effects: {
        * login({payload}, {call, put}) {
            // debugger
            const response = yield call(fakeAccountLogin, payload);
            console.log(response)
            if (response.code === 1000) {
                // const urlParams = new URL(window.location.href);
                const params = getPageQuery();
                let {redirect} = params;
                message.success('🎉 🎉 🎉  登录成功！');

                // this.state.status=ok
                /*if (redirect) {
                    const redirectUrlParams = new URL(redirect);

                    if (redirectUrlParams.origin === urlParams.origin) {
                        redirect = redirect.substr(urlParams.origin.length);

                        if (redirect.match(/^\/.*#/)) {
                            redirect = redirect.substr(redirect.indexOf('#') + 1);
                        }
                    } else {
                        window.location.href = '/';
                        return;
                    }
                }*/

                // history.replace(redirect || '/');

                // 用户名 密码正确后跳转至短信验证
                history.replace(redirect || '/user/login/messages');
                // debugger

                // 给到纯函数
                yield put({
                    type: 'changeLoginStatus',
                    payload:response,
                }); // Login successfully
                // debugger
            } else {
                message.error('用户名或密码错误')
            }
        },

       * logout() {
            const {redirect} = getPageQuery(); // Note: There may be security issues, please note

            if (window.location.pathname !== '/user/login' && !redirect) {
                history.replace({
                    pathname: '/user/login',
                    search: stringify({
                        redirect: window.location.href,
                    }),
                });
            }
        },
    },
    reducers: {
        // 改变登录状态
        changeLoginStatus(state, {payload}) {
            // debugger
            // setAuthority(payload.currentAuthority);
            return {
                ...state,
                type:payload.type,
                status: payload.code,
                username: payload.data.username,
                phoneNumber: payload.data.phoneNumber,
            };
        },
    },
};
export default Model;
