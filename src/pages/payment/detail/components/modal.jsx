import React, {useEffect, useState} from 'react';
import {Button, Modal, Upload, message} from 'antd'
import {InboxOutlined} from "@ant-design/icons";
import {connect} from "dva";

import styles from './index.less'

const {Dragger} = Upload;


// 数据聚合
@connect(({download, loading,...props}) => ({
        download,
        loading: loading.effects['download/download']
    }
))
class FileModal extends React.Component {


    // 文件上传定义的state
    state = {
        /*nameValue: '',
        versionValue: '',
        userIdValue: '',*/
        fileList: [],
        uploading: false,
    }
    // 下载模板
    handleDownload = (e) => {
        e.preventDefault();
        const {dispatch} = this.props;
        // 定义下载文件文件名
        const fileName = '代发模板.xlsx';
        dispatch({
            type: 'download/download',
            payload: {},
            // 返回函数
            // 将请求回来的参数通过callback带回来
            callback: blob => {
                if (window.navigator.msSaveOrOpenBlob) {
                    navigator.msSaveBlob(blob, fileName);
                } else {
                    const link = document.createElement('a');
                    const evt = document.createEvent('MouseEvents');
                    link.style.display = 'none';
                    link.href = window.URL.createObjectURL(blob);
                    link.download = fileName;
                    document.body.appendChild(link); // 此写法可兼容火狐浏览器
                    evt.initEvent('click', false, false);
                    link.dispatchEvent(evt);
                    document.body.removeChild(link);
                }
            }
        })
    }


    // 上传Excel文件
    onSubmitUpload = () => {
        // console.log(this.props)
        const {fileList} = this.state;
        // formData文件上传
        const importFile = new FormData();
        // console.log(importFile)
        fileList.forEach(file => {
            importFile.append('file', file);
            // 传递其他的属性值
            /*importFile.append('name', this.state.nameValue);
            importFile.append('version', this.state.versionValue);
            importFile.append('userId', this.state.userIdValue);*/
        });

        this.setState({
            uploading: true,
        });
        const {dispatch} = this.props;
        dispatch({
            type: 'payment/upload',
            payload: importFile,  // 返回给后端的参数
            callback: (response) => { // 这里其实不需要callback
                if (response.code===1000){
                    /*console.log('跳转支付页')
                    history.replace(`/payment/pay-page`)*/
                }
            }
        });
    };


    render() {
        const {fileList} = this.state
        // debugger
        const uploadProp = {
            // 移除文件的回调
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    // debugger
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: file => { // 上传文件前的钩子
                // debugger
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));

                return false;
            },
            fileList,
        };
        // console.log(this.props)
        const {isModalVisible, handleCancel, loading} = this.props
        return (
            <div className={styles.main}>
                {/*文件上传*/}
                <Modal title="文件上传" visible={isModalVisible} onCancel={handleCancel} footer={false} mask={false}>
                    <Dragger {...uploadProp}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined/>
                        </p>
                        <p className="ant-upload-text">文件拖到此处，或点击上传</p>
                        <p className="ant-upload-hint">
                            点击上传账单Excel文件
                        </p>
                    </Dragger>

                    {/*文件下载*/}
                    <p style={{textAlign: "center"}}>
                        <Button type='link' loading={loading} onClick={this.handleDownload}>下载模板</Button>
                    </p>

                    <p style={{textAlign: "center"}}>
                        <Button type="primary" onClick={this.onSubmitUpload}>确认上传</Button>
                    </p>
                </Modal>
            </div>
        );
    }
}

export default FileModal;
