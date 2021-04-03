import React, {useEffect} from 'react';
import {Dropdown,Menu} from "antd";
import {SwapOutlined} from "@ant-design/icons";
import {connect} from "dva";
// import styles from "@/components/HeaderSwitchProject/index.less";
import {history} from "umi";

// { overlayClassName: cls, ...restProps }
const HeaderSwitchProject = (props) => {
    // 切换项目
    useEffect(()=>{
        const {dispatch} = props;
        // debugger
        if (dispatch) {
            dispatch({
                type: 'switchProject/list',
            });
        }
    },[])

    const onMenuClick = (event) => {
        // 获取点击项的key
        // 参考
        const {key} = event;
        if (key === 'logout') {
            // 派发退出登录action
            const {dispatch} = this.props;
            if (dispatch) {
                dispatch({
                    type: 'login/logout',
                });
            }

            return;
        }
        // 重定向到个人页
        history.push(`/account/${key}`);
    };
    const menu = (
        <Menu onClick={onMenuClick}>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="">
                    项目一
                </a>
            </Menu.Item>
        </Menu>
    );
    return (
        <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                切换项目<SwapOutlined />
            </a>
        </Dropdown>
    );
};
// const
const mapStateToProps = (state)=>{
    return{
        state
    }
}
export default connect(mapStateToProps)(HeaderSwitchProject)