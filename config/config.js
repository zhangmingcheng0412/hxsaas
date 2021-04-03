// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  history: {
    type: 'browser',
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    // 是否开启多语言
    baseNavigator: false,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/user/login',
              name: 'login',
              component: './User/login',
            },
            {
              path: '/user',
              redirect: '/user/login',
            },
            {
              name: 'register-result',
              icon: 'smile',
              path: '/user/register-result',
              component: './user/register-result',
            },

            {
              name: 'register',
              icon: 'smile',
              path: '/user/register',
              component: './user/register',
            },
            {
              name: 'retrieve-pass',
              icon: 'smile',
              path: '/user/retrieve-pass',
              component: './user/retrieve-pass',
            },
            {
              path: '/user/login/messages',
              name: 'messages',
              component: './User/login/messages',
            },
            {
              component: '404',
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/payment',
            },
            {
              name: 'payment',
              path: '/payment',
              icon: 'payCircle',
              component: './payment/detail',
            },
            {
              name: 'pay-page',
              icon: 'smile',
              path: '/payment/pay-page',
              component: './payment/pay-page',
              hideInMenu: true,
            },
            {
              name: 'pay-confirm',
              icon: 'smile',
              path: '/payment/pay-confirm',
              component: './payment/pay-confirm',
              hideInMenu: true,
            },
            {
              name: 'fund',
              icon: 'moneyCollect',
              path: '/fund',
              component: './fund'
            },
            {
              name: 'sign',
              icon: 'fileProtect',
              path: '/sign',
              component: './sign'
            },
            {
              name: 'invoice',
              icon: 'exception',
              path: '/invoice',
              component: './invoice'
            },
            {
              name:'bill',
              icon: 'dollar',
              path: '/bill',
              component: './bill'
            },
            {
              name: 'exception',
              icon: 'warning',
              path: '/exception',
              hideInMenu: true,
              routes: [
                {
                  path: '/',
                  redirect: '/exception/403',
                },
                {
                  name: '403',
                  icon: 'smile',
                  path: '/exception/403',
                  component: './exception/403',
                },
                {
                  name: '404',
                  icon: 'smile',
                  path: '/exception/404',
                  component: './exception/404',
                },
                {
                  name: '500',
                  icon: 'smile',
                  path: '/exception/500',
                  component: './exception/500',
                },
              ],
            },
            {
              name: 'account',
              icon: 'setting',
              path: '/account/settings',
              component: './account/settings'
            },
            {
              component: '404',
            },
          ],
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  esbuild: {},
});
