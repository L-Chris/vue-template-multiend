import axios from 'axios'
import logger, {RECORD_TYPE} from '@/utils/logger'
import config from '@/utils/config'

// 默认配置
axios.defaults.timeout = 10000
axios.defaults.baseURL = config.baseURL

axios.interceptors.request.use(config => config,
  err => Promise.reject(err)
)
axios.interceptors.response.use(({data: response, config: { url, data, params }}) => {
  logger.record(RECORD_TYPE.REQUEST, {url, data, params, response})
  if (response.status === 0) {
    return response.data
  }
  return Promise.reject(data.error_msg)
}, err => Promise.reject(err))

export default axios
