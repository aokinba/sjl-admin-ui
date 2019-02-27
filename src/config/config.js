var config = {
  baseOAuthUrl: 'http://192.168.56.1:8080/',
  userAuthorizationUri: 'http://192.168.56.1:8080/uaa/oauth/authorize', // 请求授权地址
  accessTokenUri: '/auth/uaa/oauth/token', // accessToken请求地址
  userInfoUri: '/auth/client/userinfo', // 用户信息请求地址
  logoutUri: 'https://github.com/logout', // 登出请求地址
  localuri: 'http://localhost:9528', // 项目地址
  redirect_uri: 'http://localhost:9528/ssologin', // 项目地址
  resUri: 'http://localhost:8080', // 案例资源服务器地址
  clientId: 'test_server', // 客户端相关标识，请从认证服务器申请
  client_secret: 'secret', // 客户端相关标识，请从认证服务器申请
  scope: 'WRIGTH,read', // 申请的权限范围
  state: '', // 可选参数，客户端的当前状态，可以指定任意值，用于校验，此次案例不做相关认证
  response_type: 'code',
  grant_type: 'authorization_code',
  code: ''
}

export default config
