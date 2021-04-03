// @ts-nocheck
import { Component } from 'react';
import { ApplyPluginsType } from 'umi';
import dva from 'dva';
// @ts-ignore
import createLoading from 'E:/work/project/node_modules/dva-loading/dist/index.esm.js';
import { plugin, history } from '../core/umiExports';
import ModelDownload0 from 'E:/work/project/src/models/download.js';
import ModelGlobal1 from 'E:/work/project/src/models/global.js';
import ModelLogin2 from 'E:/work/project/src/models/login.js';
import ModelOrderData3 from 'E:/work/project/src/models/orderData.js';
import ModelSetting4 from 'E:/work/project/src/models/setting.js';
import ModelSwitchProject5 from 'E:/work/project/src/models/switchProject.js';
import ModelUnloadList6 from 'E:/work/project/src/models/unloadList.js';
import ModelUser7 from 'E:/work/project/src/models/user.js';
import ModelModel8 from 'E:/work/project/src/pages/profile/advanced/model.js';
import ModelModel9 from 'E:/work/project/src/pages/profile/basic/model.js';
import ModelModel10 from 'E:/work/project/src/pages/User/register/model.js';

let app:any = null;

export function _onCreate(options = {}) {
  const runtimeDva = plugin.applyPlugins({
    key: 'dva',
    type: ApplyPluginsType.modify,
    initialValue: {},
  });
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    // @ts-ignore
    ...(typeof window !== 'undefined' && window.g_useSSR ? { initialState: window.g_initialProps } : {}),
    ...(options || {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach((plugin:any) => {
    app.use(plugin);
  });
  app.model({ namespace: 'download', ...ModelDownload0 });
app.model({ namespace: 'global', ...ModelGlobal1 });
app.model({ namespace: 'login', ...ModelLogin2 });
app.model({ namespace: 'orderData', ...ModelOrderData3 });
app.model({ namespace: 'setting', ...ModelSetting4 });
app.model({ namespace: 'switchProject', ...ModelSwitchProject5 });
app.model({ namespace: 'unloadList', ...ModelUnloadList6 });
app.model({ namespace: 'user', ...ModelUser7 });
app.model({ namespace: 'model', ...ModelModel8 });
app.model({ namespace: 'model', ...ModelModel9 });
app.model({ namespace: 'model', ...ModelModel10 });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  constructor(props: any) {
    super(props);
    // run only in client, avoid override server _onCreate()
    if (typeof window !== 'undefined') {
      _onCreate();
    }
  }

  componentWillUnmount() {
    let app = getApp();
    app._models.forEach((model:any) => {
      app.unmodel(model.namespace);
    });
    app._models = [];
    try {
      // 释放 app，for gc
      // immer 场景 app 是 read-only 的，这里 try catch 一下
      app = null;
    } catch(e) {
      console.error(e);
    }
  }

  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
