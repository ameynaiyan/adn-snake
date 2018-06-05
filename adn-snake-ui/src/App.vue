<template>
  <div id="app">
    <Header></Header>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'

export default {
  name: 'app',
  components: {
    Header
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  margin-top:72px;
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #66b2b2;
    }
  }
}
#splash{
  height:100vh;
  width:100%;
  position:fixed;
  left:0;
  top:0;
  background: #66b2b2;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items:center;
}

.btn{
  transition:0.5s;
  &.btn-dark{ 
    background: #2c3e50;
    color:#66b2b2; 
    &:hover{
      background:#66b2b2;
      color:#2c3e50;
    }
  }

  &.btn-light{
    &:hover{
      background: #2c3e50;
      color:#66b2b2;
    }
  }
}
</style>
