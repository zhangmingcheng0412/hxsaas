import React, {useEffect, useState} from 'react';
import styles from "@/pages/payment/pay-confirm/index.less";
import {Statistic, Card, Col, Row, Divider, Space, message, Button, Modal, Form, Input} from "antd";
import {FormattedMessage} from "umi";
import ProForm, {ProFormText, ProFormCaptcha} from '@ant-design/pro-form';
import {connect} from "dva";
import SetPayPassword from "@/components/PaymentCode";
import {getBatchPayVo} from "@/services/payment";



/*----------*/

const PayConfirm = (props) => {
    console.log(props)
    // 取到batchId
    const {batchIdData} = props

    const [dataList,steDatalist] = useState([])
    useEffect(()=>{
        debugger
        getBatchPayVo({batchId:batchIdData}).then((data)=>{
            // console.log(data)
            const newData = [data.data];
            console.log(newData)
            steDatalist(newData)
        })
    },[])
    return (
        <div className={styles.main}>
            <Card bordered={false}>
                <div>
                    <h3><FormattedMessage id="menu.pay-confirm"/></h3>
                </div>
            </Card>
            <div className={styles.setting}>
                <Row gutter={16}>
                    <Col span={24}>
                        {

                            dataList.map((item,index)=>{
                                console.log(item)
                                return(
                                    <Card>
                                        <h4>
                                            <ul className={styles.list}>
                                                <Space size={40}>
                                                    <li style={{lineHeight:'1.615'}}>批次号：<span style={{fontSize: 24,fontWeight:'normal'}}>{item.id}</span></li>
                                                    <li>发放金额：￥<Statistic value={item.expspay} style={{display: 'inline-block',fontWeight:'normal'}}/>元</li>
                                                    <li>服务费及税金：￥<Statistic value={item.serviceAndTaxAmount} style={{display: 'inline-block',fontWeight:'normal'}}/>元</li>
                                                </Space>
                                            </ul>
                                        </h4>
                                        <Divider/>
                                        <h4>
                                            <ul className={styles.list}>
                                                <Space size={20}>
                                                    <li>支付总金额：￥<Statistic value={item.totalAmount} style={{display: 'inline-block'}} valueStyle={{color: 'red'}}/>元
                                                    </li>
                                                    <li style={{fontSize: 16}}>账户余额：￥<Statistic value={item.wallet.balance} style={{display: 'inline-block'}}/>元</li>
                                                </Space>
                                            </ul>
                                        </h4>
                                    </Card>)
                            })
                        }

                    </Col>
                </Row>
            </div>
            <PayForm/>
        </div>
    );
};

const PayForm = () => {

    const [payPassword, setPayPassword] = useState(false)
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showModal = () => {
        setVisible(true);
    };
    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };
    return (
        <div className={styles.wrapper}>
            <ProForm
                onFinish={async () => {
                    await waitTime(2000);
                    message.success('提交成功');
                }}
                submitter={{
                    searchConfig: {
                        submitText: '确认支付',
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
                {payPassword ? (
                    <div className={styles.password}>
                        <ProFormText.Password
                            label='支付密码'
                            fieldProps={{
                                size: 'large',
                            }}
                            name="password"
                            placeholder="请输入支付密码"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入支付密码!',
                                },
                            ]}
                        />
                        <p className={styles.forget}>
                            <Button type="link" size="small" onClick={showModal}>忘记密码</Button>
                        </p>
                    </div>

                ) : (
                    <div className={styles.login}>
                        <p><span style={{color: "red"}}>*</span>支付密码</p>
                        <Button type="link" onClick={showModal}>设置支付密码</Button>
                    </div>
                )}
                <div className={styles.code}>
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
                </div>

            </ProForm>

            <SetPayPassword visible={visible} handleOk={handleOk} confirmLoading={confirmLoading} handleCancel={handleCancel}/>
        </div>
    )
}

export default connect((state)=>{
    return{
        batchIdData: state.payment.batchId,
    }
})(PayConfirm)