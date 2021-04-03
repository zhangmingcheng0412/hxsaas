import React from 'react';
import ProForm, { StepsForm, ProFormText, ProFormDatePicker, ProFormSelect, ProFormTextArea, ProFormCheckbox, ProFormDateRangePicker,ProFormCaptcha } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import {FormattedMessage,useIntl} from 'umi';
import { MobileOutlined, MailOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';

import styles from './index.less'


const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const RetrievePass = (props) => {
  const intl = useIntl();
  return (
    <div className={styles.main}>
      <div className={styles.steps}>
        <h3>
          <FormattedMessage id="menu.account" />
        </h3>
        <ProCard>
          <StepsForm onFinish={async (values) => {
            console.log(values);
            await waitTime(1000);
            message.success('提交成功');
          }} formProps={{
            validateMessages: {
              required: '此项为必填项',
            },
          }} submitter={{
            render: (props) => {
              if (props.step === 0) {
                return (<Button type="primary" onClick={() => { var _a; return (_a = props.onSubmit) === null || _a === void 0 ? void 0 : _a.call(props); }}>
                  去第二步 {'>'}
                </Button>);
              }
              if (props.step === 1) {
                return [
                  <Button key="pre" onClick={() => { var _a; return (_a = props.onPre) === null || _a === void 0 ? void 0 : _a.call(props); }}>
                    返回第一步
                  </Button>,
                  <Button type="primary" key="goToTree" onClick={() => { var _a; return (_a = props.onSubmit) === null || _a === void 0 ? void 0 : _a.call(props); }}>
                    提交 {'>'}
                  </Button>,
                ];
              }
              return [
                <Button key="gotoTwo" onClick={() => { var _a; return (_a = props.onPre) === null || _a === void 0 ? void 0 : _a.call(props); }}>
                  {'<'} 返回第二步
                </Button>,
                <Button type="primary" key="goToTree" onClick={() => {
                  var _a; return (_a = props.onSubmit) === null || _a === void 0 ? void 0 : _a.call(props);

                  // 设置成功后去登录页
                  // history.push('/user/login')
                }}>
                  去登录
                </Button>,
              ];
            },
          }}>
            <StepsForm.StepForm name="base" title="验证身份" onFinish={async ({ name }) => {
              console.log(name);
              await waitTime(2000);
              return true;
            }}>
              <ProFormText fieldProps={{size: 'large', prefix: <MobileOutlined />,}}
                name="phone"
                placeholder="请输入手机号"
                rules={[
                  {
                    required: true,
                    message: '请输入手机号!',
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: '不合法的手机号格式!',
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <MailOutlined />,
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
                onGetCaptcha={async (phone) => {
                  await waitTime(1000);
                  message.success(`手机号 ${phone} 验证码发送成功!`);
                }}
              />
            </StepsForm.StepForm>

            <StepsForm.StepForm name="checkbox" title="设置密码">
              <h3>手机号：18666270412</h3>
              <ProFormText.Password
                name="password"
                placeholder={intl.formatMessage({
                    id: 'pages.login.password.placeholder',
                    defaultMessage: '请输入密码',
                })}
                rules={[
                  {
                    required:true,
                    message:(
                      <FormattedMessage
                        id="pages.login.password.required"
                        defaultMessage="请输入密码"
                      />
                    )
                  }
                ]}
              />

              <ProFormText.Password
                name="password"
                placeholder={intl.formatMessage({
                  id: 'pages.login.password.placeholder',
                  defaultMessage: '请输入密码',
                })}
                rules={[
                  {
                    required:true,
                    message:(
                      <FormattedMessage
                        id="pages.login.password.required"
                        defaultMessage="请输入密码"
                      />
                    )
                  }
                ]}
              />

            </StepsForm.StepForm>
            <StepsForm.StepForm name="time" title="完成">
                <h3>支付密码设置成功</h3>
            </StepsForm.StepForm>
          </StepsForm>
        </ProCard>
      </div>
    </div>
  );
};

export default RetrievePass;
