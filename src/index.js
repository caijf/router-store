let routerHistory; // 单实例

const instances = {}; // 多实例

// 同步路由history
function syncRouterHistory(his, key = '') {
  if (key) {
    instances[key] = his;
  } else {
    routerHistory = his;
  }
  return his;
}

// 获取路由history
function getRouterHistory(key = '') {
  if (key) {
    return instances[key];
  }
  return routerHistory;
}

export {
  syncRouterHistory,
  getRouterHistory,
  routerHistory
}