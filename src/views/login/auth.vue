<template>
  <a v-if="!signState" href="#" @:click="saveURL">登录</a>
</template>

<script>
import { getUrlVars } from '@/utils/index'
export default {
  name: 'Auth',
  data() {
    return {
      client_id: 'test_server',
      client_secret: 'secret',
      scope: 'WRIGTH,read', // Grants access to read a user's profile data.
      state: 'your state',
      getCodeURL: 'http://127.0.0.1:7777/uaa/oauth/authorize',
      getAccessTokenURL: '/uaa/oauth/token',
      getUserURl: '/client/userinfo',
      redirectURL: null,
      code: null,
      accessToken: null,
      signState: false
    }
  },
  computed: {
    formatCodeURL: function() {
      return this.getCodeURL + ('?' + JSON.stringify({
        client_id: this.client_id,
        scope: this.scope,
        state: this.state
      }))
    }
  },
  created: function() {
    this.getCode()
    // when code in url
    if (this.code) this.getAccessToken()
    else {
      this.getCodeURL += '?' + 'client_id=' + this.client_id + '&response_type=code&redirect_uri=' + window.location.href
      window.location.href = this.getCodeURL
      // if no code in top, get accessToken from cookie
      this.accessToken = this.$cookie.get('accessToken')
      if (this.accessToken) this.getUser()
    }
  },
  methods: {
    saveURL: function() {
      var a = JSON.parse(location.search)
      console.log(a)
      if (JSON.parse(location.search).state !== this.state) {
        this.$cookie.set('redirectURL', location.href, 1)
        location.href = this.getCodeURL
      }
    },
    getCode: function() {
      if (location.search) {
        const parse = getUrlVars(location.search)
        if (parse.state === this.state) {
          this.code = parse.code
        }
      }
    },
    getAccessToken: function() {
      this.axios.post(this.getAccessTokenURL, {
        client_id: this.client_id,
        client_secret: this.client_secret,
        code: this.code,
        state: this.state
      }).then((response) => {
        this.accessToken = response.data.access_token
        if (this.accessToken) {
          // save to cookie 30 days
          this.$cookie.set('accessToken', this.accessToken, 30)
          this.redirectURL = this.$cookie.get('redirectURL')
          if (this.redirectURL) {
            location.href = this.redirectURL
          }
        }
      })
    },
    getUser: function() {
      this.axios.get(this.getUserURl + '?access_token=' + this.accessToken)
        .then((response) => {
          const data = response.data
          this.signState = true
          // call parent login event
          this.$emit('loginEvent', {
            login: data.login,
            avatar: data.avatar_url,
            name: data.name
          })
        })
        // invaild accessToken
        .catch((error) => {
          console.log(error)
          this.$cookie.delete('accessToken')
        })
    },
    logout: function() {
      this.$cookie.delete('accessToken')
      this.signState = false
      this.$emit('logoutEvent')
    }
  }
}
</script>
