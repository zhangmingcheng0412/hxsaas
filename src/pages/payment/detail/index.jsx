import React, {useEffect, useState} from 'react';
import {Button, Card, message, Space} from 'antd'
import {FormattedMessage,history} from 'umi'
import styles from './index.less'
import FileModal from "@/pages/payment/detail/components/modal";
import TableData from "@/components/Table";
import {connect} from "dva";
import {getBatchData, getConfirmTollBatch} from "@/services/payment";
import {Link} from 'umi';

const Detail = (props) => {

    const [dataSource, setDataSource] = useState([]);
    // 设置Modal状态
    const [isModalVisible, setIsModalVisible] = useState(false);
    useEffect( (params) => {
        getBatchData(params).then((data)=>{
            // console.log(data)
            if (data.code===1000){
                const newData =JSON.parse(JSON.stringify(data.data)) ;
                setDataSource(newData)
            }
        }).catch(()=>{
            message.error('数据请求失败')
        })
    },[])
    // 表头字段
    const columns = [
        {
            title: '序号',
            valueType: 'index',
        },
        {
            title: '批次号',
            dataIndex: 'id',
            order: 1,
        },
        {
            title: '总笔数',
            dataIndex: 'totalCount',
            search: false,
        },
        {
            title: '总金额（元）',
            dataIndex: 'totalAmount',
            valueType: 'money',
            search: false,
        },
        {
            title: '总服务费及税金（元）',
            dataIndex: 'serviceAndTaxAmount',
            valueType: 'money',
            search: false,
        },
        {
            title: '状态',
            dataIndex: 'flowState',
            order: 2,
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
            title: '申请时间',
            dataIndex: 'createdTime',
            valueType: 'date',
            search: false,
        },
        {
            title: '申请时间',
            dataIndex: 'createdTime',
            valueType: 'dateRange',
            hideInTable: true,
            order: 3,
            search: {
                transform: (value) => {
                    return {
                        startTime: value[0],
                        endTime: value[1],
                    };
                },
            },
        },
        {
            title: '完成时间',
            dataIndex: 'belongDate',
            valueType: 'date',
            search: false,
        },
        {
            title: '操作',
            valueType: 'option',
            render: (text, record, _, action) => [
                <a onClick={() => {
                    console.log("删除页")
                }}
                >
                    删除
                </a>,
                <Link to="/payment/pay-page">
                    <span
                        key="editable"
                        onClick={(e) => {
                            // 取到当前id
                            const batchIdData = record.id;
                            // 总金额
                            const totalAmount = record.totalAmount;
                            const {dispatch} = props
                            // 派发方法
                            dispatch({
                                type:"orderData/getData",
                                payload: {
                                    batchId:batchIdData,
                                    totalMoneyNo:totalAmount,
                                }
                            })
                        }}
                    >
                        详情
                    </span>
                </Link>,
                // <Link to="/payment/pay-confirm">
                  <Link >
                    <span
                        key="editable"
                        onClick={(e) => {
                            const batchIdData = record.id;
                            // 总金额
                            const totalAmount = record.totalAmount;
                            const {dispatch} = props;

                            getConfirmTollBatch({batchId: batchIdData}).then((data) => {
                                console.log(data)
                                if (data.code!==1000){
                                    const msg = data.msg
                                    console.log(msg)
                                    message.error("钱包余额不足")
                                }else {
                                    history.push('/payment/pay-confirm')
                                }
                            })
                            // 派发方法
                            dispatch({
                                type:"orderData/getData",
                                payload: {
                                    batchId:batchIdData,
                                    totalMoneyNo:totalAmount,
                                    record
                                }
                            })

                        }}
                    >
                        付款
                    </span>
                </Link>,
            ],
        },
    ];

    // 显示文件上传
    const showModal = () => {
        setIsModalVisible(true);
    };
    // console.log(dataSource)

    // 关闭文件上传
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className={styles.main}>
            {/*文件导入button*/}
            <Card bordered={false}>
                <div className={styles.title}>
                    <h3><FormattedMessage id="menu.payment"/></h3>
                    <Button type="primary" onClick={showModal}>导入数据</Button>
                </div>
            </Card>

            {/*文件上传组件*/}
            <FileModal handleCancel={handleCancel} isModalVisible={isModalVisible} {...props}/>

            {/*表格数据*/}
            <TableData columns={columns} dataSource={dataSource}/>
        </div>
    );
};


const mapStateToProps = (state) => {
    // 接收返回来的数据
    // debugger
    return {
        // 传给props
        username: state.login.username
    }
}
export default connect(mapStateToProps)(Detail);
