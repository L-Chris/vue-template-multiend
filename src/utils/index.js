import moment from 'dayjs'

export {moment}

export function isUndef (v) {
  return v === undefined || v === null
}

export const noop = () => {}

export const identity = _ => _

function isType (name) {
  return function (obj) {
    return toString.call(obj) === '[object ' + name + ']'
  }
}

export const isObject = isType('Object')
export const isArray = isType('Array')
export const isString = isType('String')

export const toMap = (collection, key = 'value') => {
  const res = new Map()
  for (let _ of collection) {
    res.set(_[key], _)
  }
  return res
}
