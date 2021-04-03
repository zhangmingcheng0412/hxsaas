import {DefaultFooter, getMenuData, getPageTitle} from '@ant-design/pro-layout';
import {Helmet, HelmetProvider} from 'react-helmet-async';
import {Link, SelectLang, useIntl, connect, FormattedMessage} from 'umi';
import React from 'react';
import logo from '../assets/logo.png';
import logoNwe from '../assets/logo-nwe.png';
import styles from './UserLayout.less';


/*登录页*/
const UserLayout = (props) => {
    const {
        route = {
            routes: [],
        },
    } = props;
    const {routes = []} = route;
    const {
        children,
        location = {
            pathname: '',
        },
    } = props;
    const {formatMessage} = useIntl();
    const {breadcrumb} = getMenuData(routes);
    const title = getPageTitle({
        pathname: location.pathname,
        formatMessage,
        breadcrumb,
        ...props,
    });
    return (
        <HelmetProvider>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={title}/>
            </Helmet>

            <div className={styles.container}>
                {/*国际化*/}
                {/*<div className={styles.lang}>
          <SelectLang />
        </div>*/}

                <div className={styles.content}>
                    <div className={styles.top}>

                        {/*登录页页头*/}
                        <div className={styles.header}>
                            {/*<Link to="/">*/}
                            <img alt="logo" className={styles.logo} src={logo}/>

                            <span className={styles.title}>
                                <img alt="logo" className={styles.logo} src={logoNwe}
                                     style={{border: "none"}}/>综合服务平台</span>
                            {/*</Link>*/}
                        </div>
                    </div>

                    {/*登录表单*/}
                    <div className={styles.login}>
                        {children}
                    </div>
                </div>


                {/*页脚*/}
                <DefaultFooter
                    copyright={`2021-${new Date().getFullYear()} Globalhua. All Rights Reserved. 华薪科技 版权所有`}
                    links={""}
                />
            </div>
        </HelmetProvider>
    );
};


export default connect(({settings}) => ({...settings}))(UserLayout);
