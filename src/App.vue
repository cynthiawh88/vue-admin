<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  name: 'App',
  computed: {
    ...mapState([
      'accessToken',
      'historyPath'
    ])
  },
  watch: {
    "$store.state.accessToken": function() {
      if (this.$store.state.accessToken != '')
      {
        // token被设置了，跳转后台首页或历史页面
        if (this.historyPath != '')
        {
          console.log('跳转了历史地址');
          this.$router.replace({
            path: this.historyPath
          });
        } else {
          this.$router.replace({
            path: '/admin'
          });
        }
        this.$store.dispatch('setHistory', '');
      } else {
        this.$router.replace({
          path: '/'
        });
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #eceff3;
  height: 100%;
  min-width: 1366px;
}
</style>
