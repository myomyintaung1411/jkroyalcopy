// http/index.js
import axios from 'axios'
// import Swal from 'sweetalert2'
// import NoticeMsg from '@/utils/alert'
// 创建axios的一个实例

let BaseUrl = ''
if (process.env.NODE_ENV == 'development') {
  BaseUrl = '/api'
} else {
  //BaseUrl = 'http://103.246.113.24:8818/'
  BaseUrl = 'http://103.246.113.24:8503/'
}

const instance = axios.create({
  baseURL: BaseUrl, // 接口统一域名
  timeout: 6000, // 设置超时
  withCredentials: true
  // headers: {
  //   'Content-Type': 'application/json;'
  // }
})
// const $loading = useLoading()
let loading
let message = ''
// 正在请求的数量
let requestCount = 0
// 显示loading
// const showLoading = () => {
//     loading = $loading.show({
//       canCancel: false,
//       color:'#2130A5',
//       loader: 'dots',
//     })
// }
// //隐藏loading
// const hideLoading = () => {
//     setTimeout(() => {
//       loading.hide()
//     }, 2000)
// }

// 请求拦截器
instance.interceptors.request.use((config) => {
   //showLoading()
  // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
  //const token = window.localStorage.getItem('t')
  const token = window.sessionStorage.getItem('t')
  // token && (config.headers.Authorization = token)
  config.headers.token = token
  // 若请求方式为post，则将data参数转为JSON字符串
  if (config.method === 'POST') {
    config.data = JSON.stringify(config.data)
  }
  return config
}, (error) => {
  //hideLoading()
  // 对请求错误做些什么
  Promise.reject(error)
}
)

// 响应拦截器
instance.interceptors.response.use((response) => {
 // hideLoading()
  // 响应成功
  console.log('拦截器报错')
  //NoticeMsg.Message("拦截器报错","error")
  return response
}, (error) => {
  //hideLoading()
 // console.log(error)
  //NoticeMsg.Message(error.toString(),"warning")
  // 响应错误
  if (error.response && error.response.status) {
    // hideLoading()
    const status = error.response.status
    switch (status) {
      case 400:
        message = '请求错误'
        break
      case 401:
        message = '请求错误'
        break
      case 404:
        message = '请求地址出错'
        break
      case 408:
        message = '请求超时'
        break
      case 500:
        message = '服务器内部错误!'
        break
      case 501:
        message = '服务未实现!'
        break
      case 502:
        message = '网关错误!'
        break
      case 503:
        message = '服务不可用!'
        break
      case 504:
        message = '网关超时!'
        break
      case 505:
        message = 'HTTP版本不受支持'
        break
      default:
        message = '请求失败'
        
    }
    console.log(message + "error ============>");
    //NoticeMsg.Message(message,"error")
    // ElMessage.error(message)
  //  Swal.fire({
  //     title: message,
  //     text: message,
  //     //title:"HTTP版本不受支持",
  //     //title:"HTTP版本不受支持",
  //     icon: 'error',
  //     showCancelButton: false,
  //     allowOutsideClick: false,
  //     confirmButtonText: 'Ok!'
  //   })
    return Promise.reject(error)
  }
  return Promise.reject(error)
})

export default instance
