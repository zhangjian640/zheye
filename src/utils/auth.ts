/* tslint:disable */

import store from './storage'
const TOKEN_KEY = '__token__'
const USER_KEY = '__user__'

export function setToken (info: any) {
  store.set(TOKEN_KEY, info)
  return info
}

export function getToken () {
  return store.get(TOKEN_KEY)
}
export function removeToken() {
  store.remove(TOKEN_KEY)
  store.remove(USER_KEY)
}

export function setUserInfo (info: any) {
  store.set(USER_KEY, info)
  return info
}

export function getUserInfo () {
  return store.get(USER_KEY) || {}
}
