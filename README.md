# router-store

保持你的历史记录与 `react-router` 同步，参考了 [mobx-react-router](https://github.com/alisd23/mobx-react-router) 。

项目中同步你的历史记录是很有必要的。比如你在请求模块中判断登录超时，直接跳转到登录页。

- [安装](#安装)
- [使用](#使用)
- [API](#API)
  - [syncHistory](#syncHistory)
  - [routerHistory](#routerHistory)
  - [syncHistoryWithFlag](#syncHistoryWithFlag)
  - [getRouterHistoryByFlag](#getRouterHistoryByFlag)
- [其他示例](#其他示例)

## 安装

```shell
npm install router-store
```

## 使用

在配置页面路由的地方，同步历史记录。

`index.js`

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { syncHistory } from "router-store";

const history = syncHistory();

ReactDOM.render(
  <Router history={history}>
    {
      // 页面路由
    }
  </Router>,
  document.getElementById('root')
);
```

`request.js`

```javascript
import axios from "axios";
import { routerHistory } from 'router-store';

export default function request(){
  return axios({
    // ...
  }).then((res)=>{
    // 如果登录过期
    if(res.data.errCode === '-1'){
      routerHistory.push('/login');
    }
  })
}
```

## API

### syncHistory({ *type*, *history* })

同步历史记录。

- `type` - 默认 `hash`，可选 `hash` `browser` 或 `memory`
- `history` - 自定义 `history`。`type` 不满足的情况下才使用

### routerHistory

```javascript
import { routerHistory } from 'router-store';
```

`routerHistory` 即 `react-router` 的 `history`  对象。

### syncHistoryWithFlag(*flag*, { *type*, *history* })

同步历史记录，支持多个实例。通过 `getRouterHistoryByFlag ` 方法获取 `history`。

`type` `history` 同 `syncHistory ` 参数

### getRouterHistoryByFlag(*flag*)

获取通过 `syncHistoryWithFlag ` 方法设置的 `history`，返回 `react-router` 的 `history` 对象。

## 其他示例

- [自定义history](#自定义history)
- [多个实例](多个实例) - 适用于多视图多个路由配置

### 自定义 `history`

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { createHashHistory } from "history";
import { syncHistory } from "router-store";

const hashHistory = createHashHistory();
const history = syncHistory({history: hashHistory});

ReactDOM.render(
  <Router history={history}>
    {
      // 页面路由
    }
  </Router>,
  document.getElementById('root')
);
```

### 多个实例

`parentView.js`

```javascript
// ...
import { syncHistoryWithFlag } from "router-store";

const history = syncHistoryWithFlag('parent');

ReactDOM.render(
  <Router history={history}>
    {
      // 页面路由
    }
  </Router>,
  document.getElementById('root')
);
```

`childView.js`

```javascript
// ...
import { syncHistoryWithFlag } from "router-store";

const history = syncHistoryWithFlag('child');

ReactDOM.render(
  <Router history={history}>
    {
      // 页面路由
    }
  </Router>,
  document.getElementById('root')
);
```

`request.js`

```javascript
import { getRouterHistoryByFlag } from 'router-store';

const parentRouterHistory = getRouterHistoryByFlag('parent');
const childRouterHistory = getRouterHistoryByFlag('child');
```






