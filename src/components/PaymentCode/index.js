import {message, Modal} from "antd";
import ProForm, {ProFormCaptcha, ProFormText} from "@ant-design/pro-form";
import React from "react";

const SetPayPassword = (props) => {
    const waitTime = (time = 100) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, time);
        });
    };

    const {visible, handleOk, confirmLoading, handleCancel} = props
    return (
        <Modal
            title="设置支付密码"
            okText='提交'
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            <div>
                <p>手机号：156****8999</p>
                <ProForm
                    submitter={{
                        // 配置按钮文本
                        searchConfig: {
                            resetText: '取消',
                            submitText: '提交',
                        },
                        // 配置按钮的属性
                        resetButtonProps: {
                            style: {
                                // 隐藏重置按钮
                                // display: 'none',
                            },
                        },
                        submitButtonProps: {
                            style: {
                                // 隐藏重置按钮
                                // display: 'none',
                            },
                        },

                        // 完全自定义整个区域
                        /*render: (props, doms) => {
                            console.log(props);
                            return [
                                <button type="button" key="rest" onClick={() => props.form?.resetFields()}>
                                    重置
                                </button>,
                                <button type="button" key="submit" onClick={() => props.form?.submit?.()}>
                                    提交
                                </button>,
                            ];
                        },*/
                    }}
                >
                    <ProFormCaptcha
                        label='验证码'
                        fieldProps={{
                            size: 'large',
                        }}
                        c
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
                        onGetCaptcha={async () => {
                            await waitTime(1000);
                            message.success(`验证码发送成功!`);
                        }}
                    />
                    <ProFormText.Password
                        label="新密码"
                        fieldProps={{
                            size: 'large',
                        }}
                        name="input-password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    />
                    <ProFormText.Password
                        label="确认密码"
                        fieldProps={{
                            size: 'large',
                        }}
                        name="confirm-password"
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('input-password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    />
                </ProForm>
            </div>

        </Modal>
    )
}
export default SetPayPassword