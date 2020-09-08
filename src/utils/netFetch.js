// 网络读取数据

import axios from 'axios'

const timeOut = 20000 // 读取超时时间

export function postFetch (url, params) {
  let header = window.axiosHeader
  let headers = null
  if (typeof (header) === 'undefined') {
    headers = {}
  } else {
    headers = {headers: header}
  }
  // window.consolelog(headers);
  return axios.post(url, params, headers) // {headers: header}
}

export async function postData (url, params, ms = timeOut) {
  return new Promise(function (resolve, reject) {
    // eslint-disable-next-line prefer-promise-reject-errors
    setTimeout(function () { reject(null) }, ms)
    postFetch(url, params).then((json) => {
      json = json.data
      if (json.erro) {
        resolve(null)
        return
      }
      resolve(json)
    })
      .catch((error) => {
        console.log('error===', error)
        // alert(error)
        // eslint-disable-next-line prefer-promise-reject-errors
        reject(null)
      })
  })
}
