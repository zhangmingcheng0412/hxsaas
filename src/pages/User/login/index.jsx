import {
    LockOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {Alert, Space, message, Tabs} from 'antd';
import React, {useState} from 'react';
import ProForm, {ProFormText} from '@ant-design/pro-form';
import {useIntl, connect, FormattedMessage, Link} from 'umi';
import styles from './index.less';


// 用户名或者密码错误弹窗
const LoginMessage = ({content}) => (
    <Alert style={{marginBottom: 24,}} message={content} type="error" showIcon/>
);

const Login = (props) => {
    const {userLogin = {}, submitting} = props;
    const {status, type: loginType} = userLogin;
    // 修改type的值
    const [type, setType] = useState('account');

    // 国际化
    const intl = useIntl();
    // console.log(userLogin)

    // 登录派发的dispatch
    const handleSubmit = (values) => {
        // debugger
        const {dispatch} = props;
        dispatch({
            type: 'login/login',
            // 将输入的参数带给modles
            payload: {
                ...values,
                type
            },
        });
    };

    return (
        <div className={styles.main}>
            <ProForm
                initialValues={{
                    autoLogin: true,
                }}
                submitter={{
                    searchConfig: {
                        submitText: '登录',
                    },
                    render: (_, dom) => dom.pop(),
                    submitButtonProps: {
                        loading: submitting,
                        size: 'large',
                        style: {
                            width: '100%',
                        },
                    },
                }}
                onFinish={(values) => {
                    // 派发dispatch  用户名 密码传递过去
                    handleSubmit(values);
                    return Promise.resolve();
                }}
            >
                <Tabs activeKey={type} onChange={setType}>

                    {/*type值定义了登录方式 账户密码登录*/}
                    <Tabs.TabPane
                        key="account"
                        tab={intl.formatMessage({
                            id: 'pages.login.accountLogin.tab',
                            defaultMessage: '账户密码登录',
                        })}
                    />
                </Tabs>

                {status === 'error' && loginType === 'account' && !submitting && (
                    <LoginMessage
                        content={intl.formatMessage({
                            id: 'pages.login.accountLogin.errorMessage',
                            defaultMessage: '账户或密码错误',
                        })}
                    />
                )}

                {type === 'account' && (
                    <>
                        <ProFormText
                            name="username"
                            fieldProps={{
                                size: 'large',
                                prefix: <UserOutlined className={styles.prefixIcon}/>,
                            }}
                            placeholder={intl.formatMessage({
                                id: 'pages.login.username.placeholder',
                                defaultMessage: '请输入用户名!',
                            })}
                            rules={[
                                {
                                    required: true,
                                    message: (
                                        <FormattedMessage
                                            id="pages.login.username.required"
                                            defaultMessage="请输入用户名!"
                                        />
                                    ),
                                },
                            ]}
                        />
                        <ProFormText.Password
                            name="password"
                            fieldProps={{
                                size: 'large',
                                prefix: <LockOutlined className={styles.prefixIcon}/>,
                            }}
                            placeholder={intl.formatMessage({
                                id: 'pages.login.password.placeholder',
                                defaultMessage: '请输入密码',
                            })}
                            rules={[
                                {
                                    required: true,
                                    message: (
                                        <FormattedMessage
                                            id="pages.login.password.required"
                                            defaultMessage="请输入密码！"
                                        />
                                    ),
                                },
                            ]}
                        />
                    </>
                )}
                {/*忘记密码*/}
                <div style={{marginBottom: 24,}}>
                    <Space align="center" className={styles.other}>
                        <Link to="/user/retrieve-pass">
                            <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码"/>
                        </Link>
                    </Space>
                </div>
            </ProForm>
        </div>
    );
};


// 接收models传递过来的数据
export default connect(
    ({login, loading}) => ({
            userLogin: login,
            submitting: loading.effects['login/login'],
        }
    ))(Login);
