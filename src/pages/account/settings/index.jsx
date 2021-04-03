import React, {useState} from 'react';
import {Card, Row, Col, Button} from "antd";
import {FormattedMessage} from "umi";

import styles from "@/pages/account/settings/index.less";
import Dialog from "@/pages/account/settings/components/dialog";


const Settings = () => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
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
    <div className={styles.main}>
      <Card bordered={false}>
        <h3><FormattedMessage id="menu.account"/></h3>
      </Card>
      <div className={styles.setting}>
        <Row gutter={16}>

          <Col span={12}>
            <Card title="登录密码" bordered={false} type="inner">
              <h3>已设置</h3>
              <p className={styles.menu}><Button type="primary" onClick={showModal}>修改</Button></p>
            </Card>
          </Col>

          <Col span={12}>
            <Card title="支付密码" bordered={false} type="inner">
              <h3>未设置</h3>
              <p className={styles.menu}><Button type="primary" onClick={showModal}>设置</Button></p>
            </Card>
          </Col>

        </Row>
      </div>
      <Dialog visible={visible} confirmLoading={confirmLoading} modalText={modalText} handleOk={handleOk} handleCancel={handleCancel}/>
    </div>
  )
}

export default Settings
