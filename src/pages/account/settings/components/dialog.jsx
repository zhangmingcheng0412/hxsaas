import React from 'react';
import {Modal} from 'antd'

const Dialog = (props) => {
  console.log(props)
  const {visible,confirmLoading,modalText,handleCancel,handleOk} = props
  return (
    <div>
      <Modal
        title="Title"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </div>
  );
};

export default Dialog;
