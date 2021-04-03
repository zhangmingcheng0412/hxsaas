import React, {useState} from 'react';
import styles from "@/pages/sign/index.less";
import {Button, Card} from "antd";
import {FormattedMessage} from "umi";
import TableData from "@/components/Table";
import FileModal from "@/pages/sign/components/modal";

const columns =[
    {
        title: '序号',
        dataIndex: 'id',
        search: false,
    },
    {
        title: '姓名',
        dataIndex: 'title',
    },
    {
        title: '手机号',
        dataIndex: 'comments',
        search: false,
    },
    {
        title: '签约编号',
        dataIndex: 'number',
        valueType: 'money',
        search: false,
    },
    {
        title: '实名认证状态',
        dataIndex: 'created_at',
        valueType: 'dateRange',
        search: false,
    },
    {
        title: '状态',
        dataIndex: 'state',
        hideInTable: false,
        valueType: 'select',
        valueEnum: {
            all: { text: '全部', status: 'Default' },
            open: {
                text: '未解决',
                status: 'Error',
            },
            closed: {
                text: '已解决',
                status: 'Success',
                disabled: true,
            },
            processing: {
                text: '解决中',
                status: 'Processing',
            },
        },
    },
    {
        title: '导入时间',
        dataIndex: 'created_at',
        valueType: 'dateRange',
        search: false,
    },
    {
        title: '签约时间',
        dataIndex: 'created_at',
        valueType: 'dateRange',
    },
    {
        title: '操作',
        valueType: 'option',
        render: (text, record, _, action) => [
            <a key="editable" onClick={() => {}}>
                查看合同
            </a>,
            <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
                删除
            </a>,
        ],
    },
];

const Sign = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <div className={styles.main}>
            <Card bordered={false}>
                <div className={styles.title}>
                    <h3><FormattedMessage id="menu.sign"/></h3>
                    <Button type="primary" onClick={showModal}>导入签约名单</Button>
                </div>
            </Card>
            <FileModal handleCancel={handleCancel} isModalVisible={isModalVisible}/>
            <TableData columns={columns} toolBarRender={()=><Button type='primary'>全部催签</Button>}/>
        </div>
    );
};

export default Sign;