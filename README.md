# router-store

保持你的历史记录与 `react-router` 同步，参考了 [mobx-react-router](https://github.com/alisd23/mobx-react-router) 。

项目中同步你的历史记录也是很有必要的。比如你在请求模块中判断登录超时，直接跳转到登录页。

## Content

- [安装](#安装)
- [使用](#使用)
- [API](#API)
  - [syncHistory](syncHistory)
  - [routerStore](routerStore)

## 安装

```shell
npm install router-store
```

## 使用

> 需和 `history` `react-router` 一起使用

在配置页面路由的地方，同步历史记录。

`index.js`

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { createHashHistory } from "history";
import { syncHistory } from "router-store";

const hashHistory = createHashHistory();
const history = syncHistory(hashHistory);

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
import { routerStore } from 'router-store';

export default function request(){
  return axios({
    // ...
  }).then((res)=>{
    // 如果登录过期
    if(res.data.errCode === '-1'){
      routerStore.history.push('/login');
    }
  })
}
```

## API

### routerStore

```javascript
import { routerStore } from 'router-store';
```

`routerStore` 包含原生的 `history` 和 `history` 下的 `location` 对象。

### syncHistory(history)

- `history` - 历史对象，通常是 `browserHistory` 或 `hashHistory` 


