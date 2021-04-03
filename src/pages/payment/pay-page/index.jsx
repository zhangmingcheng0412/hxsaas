import React, {useEffect, useState} from 'react';
import {Button, Card, message, Space} from "antd";
import {FormattedMessage, Link,history} from "umi";
import styles from "@/pages/payment/pay-page/index.less";
import TableData from "@/components/Table";
import {getConfirmTollBatch, getOrderData} from "@/services/payment";
import {connect} from "dva";


const PayPage = (props) => {
    let {batchIdData, totalMoneyNo, data, batchIdDetails} = props;
    const [dataSource, setDataSource] = useState([]);
    // console.log(batchIdData)
    const confirmTollBatch = (batchIdData) => {
        getConfirmTollBatch({batchId: batchIdData}).then((data) => {
            if (data.code!==0){
                console.log(data)
                const msg = data.msg
                console.log(msg)
                message.error("钱包余额不足")
            }else {
                history.replace('/payment/pay-confirm')
            }
        })

    }

    // 详情查询到的data 赋值渲染
    useEffect(() => {
        setDataSource(data)
    }, [data])


    // 文件上传查询到的data
    useEffect(() => {
        if (batchIdData === '') {
            return
        }

        getOrderData({batchId: batchIdData}).then((data) => {
            // debugger
            if (data.code === 1000) {
                // 请求成功，设置新的值
                const newData = data.data;
                setDataSource(newData)
            }
        }).catch(() => {
            message.error('数据请求失败')
        })
    }, [batchIdData])

    // 确认代发处理函数


    // 表头配置
    const columns = [
        {
            title: '序号',
            valueType: 'index',
        },
        {
            title: '订单号',
            dataIndex: 'orderNo',
            search: false,
        },
        {
            title: '姓名',
            dataIndex: 'customerRealname',
        },
        {
            title: '证件号',
            dataIndex: 'customerCertNo',
            search: false,
        },
        {
            title: '账号',
            dataIndex: 'bankAccount',
            search: false,
        },
        {
            title: '金额',
            dataIndex: 'expspay',
            valueType: 'money',
            search: false,
        },
        {
            title: '服务费及税金（元）',
            dataIndex: 'serviceCharge',
            valueType: 'money',
            search: false,
        },
        {
            title: '手机号',
            dataIndex: 'customerMobile',
            search: false
        },
        {
            title: '商户备注',
            dataIndex: 'memo',
            search: false
        },
        {
            title: '商户订单号',
            dataIndex: 'customerId',
            search: false
        },
        {
            title: '状态',
            dataIndex: 'orderStatus',
            valueType: 'select',
            valueEnum: {
                PAY_PENDING: {text: '待发放', status: 'Default'},
                PAY_FALL: {
                    text: '发放中',
                    status: 'Processing',
                },
                PAY_SUCCESS: {
                    text: '已发放',
                    status: 'Success',
                },
            },
        },
        {
            title: '备注',
            dataIndex: 'remark',
            search: false
        },
    ];
    return (
        <div className={styles.main}>
            <Card bordered={false}>
                <div className={styles.title}>
                    <h3><FormattedMessage id="menu.payment.detail"/></h3>
                </div>
            </Card>
            <TableData columns={columns} dataSource={dataSource}/>
            <Card bordered={false}>
                <div className={styles.settle}>
                    <Space>
                        <h3>支付金额合计：<span style={{color: 'red'}}>
              {totalMoneyNo}
            </span>元</h3>
                        <Link to="/payment">
                            <Button type="primary" style={{backgroundColor: '#c1c1c1', border: '#c1c1c1'}}>放弃</Button>
                        </Link>
                        {/*<Link to="/payment/pay-confirm">*/}
                            {/*提交需要给后端传个状态*/}
                            <Button type="primary" onClick={()=>{confirmTollBatch(batchIdDetails)}}>提交</Button>

                        {/*</Link>*/}
                    </Space>
                </div>
            </Card>
        </div>
    );
};


const mapStateToProps = (state) => {
    // 接收返回来的数据
    return {
        // 传给props
        // ID
        batchIdData: state.list.data,
        // 金额
        totalMoneyNo: state.orderData.totalMoneyNo,
        // 数据
        data: state.orderData.data,
        // 详情传递的ID  用于提交更改状态
        batchIdDetails: state.orderData.batchId
    }
}

export default connect(mapStateToProps)(PayPage);
