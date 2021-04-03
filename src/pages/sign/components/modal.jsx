import React, {useEffect, useState} from 'react';
import {Button, Modal, Upload,message} from 'antd'
import {InboxOutlined} from "@ant-design/icons";
import {render} from "react-dom";

const {Dragger} = Upload;

const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};
class FileModal extends React.Component {

    render(){
        const {isModalVisible,handleCancel} = this.props
        return (
            <div>
                <Modal title="文件上传" visible={isModalVisible}  onCancel={handleCancel} footer={false} mask={false}>
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">文件拖到此处，或点击上传</p>
                        <p className="ant-upload-hint">
                            点击上传账单Excel文件
                        </p>
                    </Dragger>
                    <p><a>下载模板</a></p>
                    <Button type="primary" >确认上传</Button>
                </Modal>
            </div>
        );
    }
}

export default FileModal;
