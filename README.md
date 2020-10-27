# router-store

保持你的历史记录与 `react-router` 同步，参考了 [mobx-react-router](https://github.com/alisd23/mobx-react-router) 。

项目中同步你的历史记录是很有必要的。比如你在请求模块中判断登录超时，直接跳转到登录页。

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
import { createHashHistory } from "history";
import { Router } from 'react-router';
import { syncRouterHistory } from "router-store";

const hashHistory = createHashHistory();

syncRouterHistory(hashHistory);

ReactDOM.render(
  <Router history={hashHistory}>
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

### syncRouterHistory(history: any, key?: string)

同步 `Router` 的 `history` 。

- `history` - [history](https://github.com/ReactTraining/history) 对象。
- `key` - 可选，用于多个 `history` 实例的键值。

### routerHistory

`history`  对象。

### getRouterHistory(key?:string)

获取 `history` 。

## 示例：多个 `history` 

`parentView.js`

```javascript
// ...
import { createHashHistory } from "history";
import { syncRouterHistory } from "router-store";

const hashHistory = createHashHistory();

syncRouterHistory(hashHistory, 'parent');

ReactDOM.render(
  <Router history={hashHistory}>
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
import { createHashHistory } from "history";
import { syncRouterHistory } from "router-store";

const hashHistory = createHashHistory();

syncRouterHistory(hashHistory, 'child');

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
import { getRouterHistory } from 'router-store';

const parentRouterHistory = getRouterHistory('parent');
const childRouterHistory = getRouterHistory('child');
```
