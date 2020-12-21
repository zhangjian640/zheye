<template>
  <div class='container'>
    <global-header :user="user" />
    <loading v-if="isLoading" text="拼命加载中" background="rgba(0, 0, 0, .7)" />
    <router-view />
    <global-footer />
  </div>
</template>

<script lang='ts'>
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from './components/GlobalHeader.vue'
import GlobalFooter from './components/GlobalFooter.vue'
import Loading from './components/Loading.vue'
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from './store'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    GlobalFooter,
    Loading
  },
  setup () {
    const { state } = useStore<GlobalDataProps>()
    const user = computed(() => state.user)
    const isLoading = computed(() => state.loading)
    return {
      user,
      isLoading
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
