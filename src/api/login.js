import request from '@/utils/request'
import config from '@/config/config'
import qs from 'qs'
import { getToken } from '@/utils/auth'

export function login(username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/auth/client/userinfo',
    method: 'get',
    params: { access_token: token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function ssologin() {
  var authorUrl = config.userAuthorizationUri
  authorUrl = authorUrl + ('?' + qs.stringify({
    client_id: config.clientId,
    response_type: config.response_type,
    state: config.state,
    redirect_uri: config.redirect_uri
  }))
  window.location.href = authorUrl
}

export function ssologout(return_url) {
  this.$router.push('/ssologout' + '?return_url=' + return_url)
}

export function checkLogin() {
  var tokenInfo = getToken()
  if (tokenInfo.access_token === null || tokenInfo.access_token === 'null') {
    return false
  }
  return true
}

export function getTokenFromService(code) {
  return request({
    method: 'post',
    url: config.accessTokenUri,
    headers: {
      'Accept': 'application/json',
      'authorization': 'Basic dGVzdF9zZXJ2ZXI6c2VjcmV0'
    },
    data: {
      client_id: config.clientId,
      code: code,
      redirect_uri: config.redirect_uri,
      grant_type: config.grant_type
    },
    transformRequest: [function(data) {
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }]
  })
}
