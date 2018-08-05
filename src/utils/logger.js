import queryString from 'query-string'
import store from '@/store'
import {isObject, isString} from '@/utils'

const MILLI_SECONDS_IN_MINUTE = 60000

export const RECORD_TYPE = {
  PUSH: 'push',
  REQUEST: 'request',
  RESPONSE: 'response'
}

class Logger {
  constructor () {
    this.init()
  }

  init () {
    Bugtags.setBeforeSendingCallback(this.beforeSend.bind(this))
    Bugtags.setAfterSendingCallback(this.afterSend.bind(this))

    window.addEventListener('load', () => {
      this.record(RECORD_TYPE.PUSH)
    })

    window.addEventListener('hashchange', () => {
      this.record(RECORD_TYPE.PUSH)
    })

    this.clearLogs()
  }

  beforeSend () {
    let actions = this.clearLogs()
    let user = store.get('logUser')
    for (let log of actions) {
      Bugtags.log(log.content)
    }
    for (let key in user) {
      Bugtags.setUserData(key, user[key])
    }
  }

  afterSend () {
    store.remove('logs')
    Bugtags.removeAllLog()
    Bugtags.removeAllConsoleLog()
  }

  record (type, content) {
    let actions = store.get('logActions')
    actions = actions || []
    let time = (new Date()).valueOf()
    if (type === RECORD_TYPE.PUSH) {
      actions.push({ time, content: `push: ${window.location.href}` })
    } else if (type === RECORD_TYPE.REQUEST) {
      let {url, params, data, response} = content
      actions.push({ time, content: `request: ${window.location.origin}${url}?${queryString.stringify(params)} data:${JSON.stringify(data)}` })
      actions.push({ time, content: `response: ${JSON.stringify(response)}`})
    }
    store.set('logActions', actions)
  }

  setUser (data, value) {
    let user = store.get('logUser')
    user = user || {}
    if (isString(data)) {
      user[data] = value
    } else if (isObject(data)) {
      Object.assign(user, data)
    }
    store.set('logUser', user)
  }
  // 去除15分钟之前的日志
  clearLogs () {
    let actions = store.get('logActions')
    actions = actions || []
    let now = (new Date()).valueOf()
    let range = MILLI_SECONDS_IN_MINUTE * 10
    actions = actions.filter(_ => (now - _.time) < range)
    store.set('logActions', actions)
    return actions
  }
}

export default new Logger()