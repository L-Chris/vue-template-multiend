import logger from '@/utils/logger'

export default vue => {
  vue.prototype.$logger = logger
}