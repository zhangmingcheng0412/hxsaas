import {LogoutOutlined, SettingOutlined} from '@ant-design/icons';
import {Avatar, Menu, Spin} from 'antd';
import React from 'react';
import {history, connect} from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';


class AvatarDropdown extends React.Component {
    // 顶部导航栏用户切换
    onMenuClick = (event) => {
        // 获取点击项的key
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

    render() {
        const {
            currentUser = {
                avatar: '',
                name: '',
            },
            menu,
        } = this.props;
        // 用户下拉组件
        const menuHeaderDropdown = (
            <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
                {menu && (
                    <Menu.Item key="settings">
                        <SettingOutlined/>
                        个人设置
                    </Menu.Item>
                )}
                {menu && <Menu.Divider/>}

                <Menu.Item key="logout">
                    <LogoutOutlined/>
                    退出登录
                </Menu.Item>
            </Menu>
        );
        return currentUser && currentUser.name ? (
            // 用户信息以及用户名存在 ↑↑↑↑↑
            // 加载用户信息
            <HeaderDropdown overlay={menuHeaderDropdown}>
                <span className={`${styles.action} ${styles.account}`}>
                    {/*头像*/}
                  <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar"/>
                    {/*用户名*/}
                  <span className={`${styles.name} anticon`}>{currentUser.name}</span>
                </span>
            </HeaderDropdown>
        ) : (
            // 否则加载动画
            <span className={`${styles.action} ${styles.account}`}>
                {/*加载动画*/}
                <Spin size="small" style={{marginLeft: 8, marginRight: 8,}}/>
            </span>
        );
    }
}

export default connect(({user}) => ({
    currentUser: user.currentUser,
}))(AvatarDropdown);
