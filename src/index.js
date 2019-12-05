import { createHashHistory, createBrowserHistory, createMemoryHistory } from 'history';

// 默认历史记录类型
const defaultHistoryType = 'hash';

// 映射创建 history 值
const createHistoryTypes = {
  hash: createHashHistory,
  browser: createBrowserHistory,
  memory: createMemoryHistory
}

/**
 * 获取 history 对象
 * @param {String} type 历史记录类型
 */
function getHistory(type = defaultHistoryType){
  const history = type && createHistoryTypes[type] ? createHistoryTypes[type]() : null;
  return history;
}

// 单例
export let routerHistory = null;

/**
 * 同步 history 对象，单例
 * @param {String} type 
 */
export const syncHistory = ({
  type = defaultHistoryType,
  ...rest
} = {}) => {
  let tmpHistory = getHistory(type);

  // 自定义 history
  if(rest && rest.history && typeof rest.history === 'object'){
    tmpHistory = rest.history;
  }

  // 缓存 history 引用
  routerHistory = tmpHistory;

  return tmpHistory;
}

// 多个实例
const instances = {};

/**
 * 
 * @param {String} flag 多个实例的标识
 */
export function getRouterHistoryByFlag(flag){
  return flag && instances[flag] ? instances[flag] : null;
}

/**
 * 同步 history 对象，多个实例
 */
export const syncHistoryWithFlag = (flag = '', {
  type = defaultHistoryType,
  ...rest
} = {})=>{
  let tmpHistory = getHistory(type);

  // 自定义 history
  if(rest && rest.history && typeof rest.history === 'object'){
    tmpHistory = rest.history;
  }

  if(flag){
    instances[flag] = tmpHistory;
  }

  return tmpHistory;
}
