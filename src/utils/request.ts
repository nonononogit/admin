import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import { ElMessage } from 'element-plus'
import pinia from '@/store'
import { useUserStore } from '@/store/modules/user'
interface ResponseData<T> {
  code: number
  data: T
  message: string
  ok: boolean
}
//创建axios实例
let request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})
//请求拦截器
request.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  let token = useUserStore(pinia).token
  if (token) {
    config.headers.token = token
  }
  return config
})
//响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse<any, ResponseData<any>>) => {
    const res = response.data
    if (res.code !== 200) {
      ElMessage.error(res.message)
      return Promise.reject(res.data)
    } else {
      return res.data
    }
  },
  (error) => {
    //处理网络错误
    let status = error.response.status
    switch (status) {
      case 401:
        ElMessage.error('token过期')
        break
      case 403:
        ElMessage.error('无权访问')
        break
      case 404:
        ElMessage.error('请求地址错误')
        break
      case 500:
        ElMessage.error('服务器出现问题')
        break
      default:
        ElMessage.error('无网络')
    }
    return Promise.reject(error)
  },
)
export default request
