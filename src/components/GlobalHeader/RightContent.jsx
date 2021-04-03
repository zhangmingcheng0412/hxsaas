import React from 'react';
import { connect } from 'umi';
import Avatar from './AvatarDropdown';
import styles from './index.less';
import HeaderSwitchProject from "@/components/HeaderSwitchProject";


// 全局顶部栏菜单
const GlobalHeaderRight = (props) => {
  const { theme, layout } = props;
  let className = styles.right;
  // 顶部栏换肤
  if (theme === 'dark' && layout === 'top') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>

      {/*添加头部组件位置*/}
      {/*添加头部组件位置*/}
      {/*<p>切换项目</p>*/}
      <HeaderSwitchProject/>
      {/*添加头部组件位置*/}
      {/*用户头像组件*/}
      <Avatar menu />
    </div>
  );
};

export default connect(({ settings }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
