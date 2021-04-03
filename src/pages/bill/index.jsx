import React from 'react';
import {Card,} from 'antd';
import {FormattedMessage} from "umi";
import TableData from "@/components/Table";

import styles from "@/pages/bill/index.less";

const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    search: false,
    width:120,
    fixed: 'left',
  },
  {
    title: '账单编号',
    dataIndex: 'comments',
    search: false,
    width:120,
  },
  {
    title: '账单月份',
    key: 'showTime',
    dataIndex: 'number',
    valueType: 'money',
    hideInSearch: false,
    search: false,
    width:120,
  },
  {
    title: '账单周期',
    dataIndex: 'created_at',
    valueType: 'dateRange',
    hideInTable: false,
    width:120,
  },
  {
    title: '项目名称',
    dataIndex: 'comments',
    search: false,
    width:120,
  },
  {
    title: '客户名称',
    dataIndex: 'comments',
    search: false,
    width:120,
  },
  {
    title: '佣金实发金额（元）',
    key: 'showTime',
    dataIndex: 'number',
    valueType: 'money',
    hideInSearch: false,
    search: false,
    // width:120,
  },
  {
    title: '服务费及税金（元）',
    key: 'showTime',
    dataIndex: 'number',
    valueType: 'money',
    hideInSearch: false,
    search: false,
    // width:120,
  },
  {
    title: '已支付金额（元）',
    dataIndex: 'comments',
    search: false,
    // width:120,
  },
  {
    title: '未支付金额（元）',
    dataIndex: 'comments',
    search: false,
    // width:120,
  },
  {
    title: '账单状态',
    dataIndex: 'comments',
    search: false,
    width:120,
  },
  {
    title: '创建时间',
    dataIndex: 'comments',
    search: false,
    width:120,
  },
  {
    title: '操作',
    valueType: 'option',
    width:120,
    fixed: 'right',
    render: (text, record, _, action) => [
      <a key="editable" onClick={() => {}}>
        详情
      </a>,
      /*<a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        付款
      </a>,*/
    ],
  },
];

const Bill = () => {
  return (
    <div className={styles.main}>
      <Card bordered={false}>
        <h3><FormattedMessage id="menu.bill"/></h3>
      </Card>
      <TableData columns={columns} toolBarRender={false} scroll={{x:1600}}/>
    </div>
  );
};

export default Bill;
