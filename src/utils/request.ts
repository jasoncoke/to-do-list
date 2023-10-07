import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { message } from 'ant-design-vue'

const MESSAGE_ERROR = (msg: string) => {
  message.error(msg)
}
declare module 'axios' {
  interface AxiosResponse<T = any> {
    message: string;
    // 这里追加你的参数
  }
  export function create(config?: AxiosRequestConfig): AxiosInstance;
}

const request: AxiosInstance = axios.create({
  baseURL: 'http://localhost:9592', // url = base url + request url
  timeout: 20 * 1000 // request timeout
})

request.interceptors.request.use(
  (config) => {
    if (config.params && Object.keys(config?.params).length) {
      console.log(111)
    }
    return config
  },
  (error: any) => {
    console.log('请求错误：' + error) // for debug
    MESSAGE_ERROR(`${error.status}:  ${error.message}`)
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: any) => {
    console.log(error)

    if (error.message.indexOf('timeout of') > -1) {
      error.message = '请求超时，请重新进行相关操作'
    }
    // switch (error.response.status) {
    //   case 403: {
    //     const { location } = error.response.headers
    //     setTimeout(() => {
    //       window.location.href = location
    //     }, 2000)
    //     break
    //   }
    //   default:
    //     break
    // }

    console.log('err: ' + error.response?.data.message || error.message) // for debug
    MESSAGE_ERROR(`${error.response?.data.message || error.message || '服务器错误 Unknown'}`)
    return Promise.reject(error)
  }
)

const loadingIstance = new Map()
/**
 *
 * @param {Object} axiosOptions axios options
 * @param {Document} target loading 所覆盖的 DOM 节点, 默认全局
 */
async function apiAxios(axiosOptions: AxiosRequestConfig, target = 'body') {
  try {
    // if (target) {
    //   const $loading = useLoading({
    //     container: target === 'body' ? undefined : target
    //   }).show({
    //     color: '#409EFF',
    //     backgroundColor: 'rgba(255, 255, 255, .7)',
    //     lockScroll: true
    //   })
    //   loadingIstance.set(target, $loading)
    // }
    const res: AxiosResponse = await request(axiosOptions)
    target && loadingIstance.has(target) && loadingIstance.get(target).hide()
    switch (res.status) {
      case 200:
        return Promise.resolve(res.data)
      case undefined:
        return Promise.resolve(res)
      default:
        MESSAGE_ERROR(res.message || 'error')
        return Promise.reject(res.data)
    }
  } catch (response) {
    target && loadingIstance.has(target) && loadingIstance.get(target).hide()
    return Promise.reject(response)
  }
}

export default apiAxios
