import React from 'react';
import styles from "@/pages/invoice/index.less";
import {FormattedMessage} from "umi";
import {Button, Card} from "antd";
import TableData from "@/components/Table";

const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    // copyable: true,
    // ellipsis: true,
    search: false,
  },
  {
    title: '发票流水号',
    dataIndex: 'comments',
    search: false,
  },
  {
    title: '开票金额',
    key: 'showTime',
    dataIndex: 'number',
    valueType: 'money',
    hideInSearch: false,
    search: false,
  },
  {
    title: '状态',
    dataIndex: 'state',
    hideInTable: false,
    valueType: 'select',
    search: false,
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
    title: '申请时间',
    dataIndex: 'created_at',
    valueType: 'dateRange',
    hideInTable: false,
  },
  {
    title: '操作',
    valueType: 'option',
    /*render: (text, record, _, action) => [
      <a key="editable" onClick={() => {}}>
        详情
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        付款
      </a>,
    ],*/
  },
];

const Invoice = () => {
  return (
    <div className={styles.main}>
      <Card bordered={false}>
        <h3><FormattedMessage id="menu.invoice"/></h3>
      </Card>
      <TableData columns={columns} toolBarRender={()=><Button type='primary'>新增发票</Button>}/>
    </div>
  );
};

export default Invoice;
