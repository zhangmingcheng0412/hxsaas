import React from 'react';
import {FormattedMessage} from "umi";
import {Button, Card} from "antd";

import styles from "@/pages/fund/index.less";
import TableData from "@/components/Table";


const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    search: false,
  },
  {
    title: '交易流水',
    dataIndex: 'title',
    search: false,
  },
  {
    title: '交易金额',
    dataIndex: 'comments',
    search: false,
  },
  {
    title: '余额（元）',
    dataIndex: 'number',
    valueType: 'money',
    search: false,
  },
  {
    title: '交易时间',
    dataIndex: 'created_at',
    valueType: 'dateRange',
    search: false,
  },
];

const Fund = () => {
  return (
    <div className={styles.main}>
      <Card bordered={false}>
        <div>
          <h3><FormattedMessage id="menu.fund"/></h3>
        </div>
      </Card>
      <div className={styles.wrapper}>
        <Card title="资金账户" bordered={false} type="inner">
          <p>账户名称：<span>*****信息科技有限公司</span></p>
          <p>开户银行： <span>招商银行</span></p>
          <p>银行账号： <span>98474947384378474</span></p>
          <p>账户余额： <span style={{color:"red",fontWeight:'bold'}}>¥89,999.00</span></p>
        </Card>
        <Card title="交易流水" bordered={false} type="inner">
          <TableData columns={columns} toolBarRender={false} search={false}/>
        </Card>
      </div>
    </div>
  );
};

export default Fund;
