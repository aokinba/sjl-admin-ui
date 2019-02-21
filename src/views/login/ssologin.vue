<template>
  <div>
    正在登录
  </div>
</template>

<script>
export default {
  name: 'Ssologin',
  data: function() {
    return {
      state: '',
      code: ''
    }
  },
  mounted: function() {
    this.code = this.$route.query.code
    this.state = this.$route.query.state
    this.getToken()
  },
  methods: {
    getToken: function() {
      this.$store.dispatch('GetTokenFromService', this.code).then(() => {
        console.log('succeed')
        this.$router.push({ path: '/' })
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style>
</style>

