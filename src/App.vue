<template>
  <div id="app">
    <!-- <headinfo></headinfo> -->
    <router-view></router-view>
  </div>
</template>

<script>
  // import headinfo from '@/components/head.vue'
export default {
  name: 'App',
  components:{
    // headinfo
  },
  methods: {
    index() {
        // console.log(this.$Cookie.get("token"))
        if (this.$Cookie.get("token")) {
          this.$router.push('/userindex')
        }else{
          this.$router.push('/login')
        }
      },
  },
  created() {
    this.$axios.defaults.headers.common['Authorization'] = this.$store.state.user.token
    if (this.$Cookie.get("token")) {
          this.$router.push('/userindex')
        }else{
          this.$router.push('/login')
        }
  },

}
</script>
<style>

</style>
