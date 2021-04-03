// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from 'E:/work/project/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';
import LoadingComponent from '@/components/PageLoading/index';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BlankLayout' */'E:/work/project/src/layouts/BlankLayout'), loading: LoadingComponent}),
    "routes": [
      {
        "path": "/user",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__UserLayout' */'E:/work/project/src/layouts/UserLayout'), loading: LoadingComponent}),
        "routes": [
          {
            "path": "/user/login",
            "name": "login",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__User__login' */'E:/work/project/src/pages/User/login'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "path": "/user",
            "redirect": "/user/login",
            "exact": true
          },
          {
            "name": "register-result",
            "icon": "smile",
            "path": "/user/register-result",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__register-result' */'E:/work/project/src/pages/user/register-result'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "name": "register",
            "icon": "smile",
            "path": "/user/register",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__register' */'E:/work/project/src/pages/user/register'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "name": "retrieve-pass",
            "icon": "smile",
            "path": "/user/retrieve-pass",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__retrieve-pass' */'E:/work/project/src/pages/user/retrieve-pass'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "path": "/user/login/messages",
            "name": "messages",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__User__login__messages' */'E:/work/project/src/pages/User/login/messages'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'E:/work/project/src/pages/404'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      },
      {
        "path": "/",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BasicLayout' */'E:/work/project/src/layouts/BasicLayout'), loading: LoadingComponent}),
        "Routes": [
          "src/pages/Authorized"
        ],
        "authority": [
          "admin",
          "user"
        ],
        "routes": [
          {
            "path": "/",
            "redirect": "/payment",
            "exact": true
          },
          {
            "name": "payment",
            "path": "/payment",
            "icon": "payCircle",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__payment__detail' */'E:/work/project/src/pages/payment/detail'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "name": "pay-page",
            "icon": "smile",
            "path": "/payment/pay-page",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__payment__pay-page' */'E:/work/project/src/pages/payment/pay-page'), loading: LoadingComponent}),
            "hideInMenu": true,
            "exact": true
          },
          {
            "name": "pay-confirm",
            "icon": "smile",
            "path": "/payment/pay-confirm",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__payment__pay-confirm' */'E:/work/project/src/pages/payment/pay-confirm'), loading: LoadingComponent}),
            "hideInMenu": true,
            "exact": true
          },
          {
            "name": "fund",
            "icon": "moneyCollect",
            "path": "/fund",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__fund' */'E:/work/project/src/pages/fund'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "name": "sign",
            "icon": "fileProtect",
            "path": "/sign",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__sign' */'E:/work/project/src/pages/sign'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "name": "invoice",
            "icon": "exception",
            "path": "/invoice",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__invoice' */'E:/work/project/src/pages/invoice'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "name": "bill",
            "icon": "dollar",
            "path": "/bill",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__bill' */'E:/work/project/src/pages/bill'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "name": "exception",
            "icon": "warning",
            "path": "/exception",
            "hideInMenu": true,
            "routes": [
              {
                "path": "/",
                "redirect": "/exception/403",
                "exact": true
              },
              {
                "name": "403",
                "icon": "smile",
                "path": "/exception/403",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__exception__403' */'E:/work/project/src/pages/exception/403'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "name": "404",
                "icon": "smile",
                "path": "/exception/404",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__exception__404' */'E:/work/project/src/pages/exception/404'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "name": "500",
                "icon": "smile",
                "path": "/exception/500",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__exception__500' */'E:/work/project/src/pages/exception/500'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "name": "account",
            "icon": "setting",
            "path": "/account/settings",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__account__settings' */'E:/work/project/src/pages/account/settings'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'E:/work/project/src/pages/404'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
