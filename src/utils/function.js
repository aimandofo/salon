/**
 * 公共function
 * @param index
 * @returns {string|*}
 */
// 星期
export function getChineseWeek (index) {
  switch (index) {
    case 0:
      return '一'
    case 1:
      return '二'
    case 2:
      return '三'
    case 3:
      return '四'
    case 4:
      return '五'
    case 5:
      return '六'
    case 6:
      return '日'
    default:
      return index
  }
}

// 保存本地數據
export function saveLocalData (name = '', data = '') {
  if (typeof window.headers.shopid === 'undefined' ||
    window.headers.shopid === '') {
    return false;
  }
  name = name + '_' + window.headers.shopid;
  localStorage.setItem(name, data);
  return true;
}

// 獲取本地數據
export function getLocalData (name) {
  if (typeof window.headers.shopid === 'undefined' ||
    window.headers.shopid === '') {
    return null;
  }
  name = name + '_' + window.headers.shopid;
  return localStorage.getItem(name);
}

export function saveLocalJsonData (name, data) {
  return saveLocalData(name, JSON.stringify(data))
}

export function getLocalJsonData (name) {
  const data = getLocalData(name)
  return JSON.parse(data);
}
