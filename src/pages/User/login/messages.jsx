import React, {useEffect, useState} from 'react';
import {message} from 'antd';
import ProForm, {ProFormCaptcha} from '@ant-design/pro-form';
import {MailOutlined} from '@ant-design/icons';
import {getFakeCaptcha, realAccountLogin} from '@/services/login';
import {connect} from "dva";
import {history} from "umi";

const waitTime = (time=100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

const Messages = ({phoneNumber}) => {
    console.log(phoneNumber)
    return (
        <div style={{width: 330, margin: 'auto',}}>
            <ProForm
                // 表单提交方法
                onFinish={async (values) => {
                    // 返回回来的状态码
                    const res = await realAccountLogin(values)
                    // console.log(res.code)
                    // 校验
                    if (res.code === 1000) {
                        // 成功返回首页 定向到后台登录地址
                        history.replace('/');
                        message.success('验证成功')
                    } else {
                        // 失败返回失败信息
                        message.error('验证码错误')
                    }
                }}
                submitter={{
                    searchConfig: {
                        submitText: '登录',
                    },
                    render: (_, dom) => dom.pop(),
                    submitButtonProps: {
                        size: 'large',
                        style: {
                            width: '100%',
                        },
                    },
                }}
            >
                <h3 style={{textAlign: 'left',}}>身份验证</h3>
                <p>手机号 {phoneNumber}</p>
                {/*验证码输入*/}
                <ProFormCaptcha
                    fieldProps={{
                        size: 'large',
                        prefix: <MailOutlined/>,
                    }}
                    captchaProps={{
                        size: 'large',
                    }}
                    phoneName="phone"
                    name="captcha"
                    rules={[
                        {
                            required: true,
                            message: '请输入验证码',
                        },
                    ]}
                    placeholder="请输入验证码"
                    onGetCaptcha={
                        async () => {
                            // debugger
                            // 得到props
                            // const {username} = props
                            // 带过去的状态值
                            // 请求验证码返回的结果
                            await waitTime(1000)
                            const result = await getFakeCaptcha();
                            console.log(result)
                            if (result === false) {
                                return;
                            }
                            message.success('获取验证码成功！');
                        }
                    }/>
            </ProForm>
        </div>);
}


/*const mapStateToProps = (state) => {
    // 接收返回来的数据
    debugger
    return {
        // 传给props
        username: state.login.username
    }
}
// 数据聚合
export default connect(mapStateToProps)(Messages)*/

export default connect(
    ({login})=>({
        phoneNumber:login.phoneNumber
    }))(Messages)
