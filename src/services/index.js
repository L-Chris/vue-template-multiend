import axios from 'axios'

// 默认配置
axios.defaults.timeout = 10000
axios.defaults.baseURL = '/admin'

axios.interceptors.request.use(config => config,
  err => Promise.reject(err)
)
axios.interceptors.response.use(({data: {data, status}, config: { url }}) => {
  if (status === 0) {
    return data
  }
  return Promise.reject(data.error_msg)
}, err => Promise.reject(err))

export default axios
