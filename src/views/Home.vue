<template>
  <column-list :list='list' />
</template>

<script lang='ts'>
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import ColumnList from '../components/ColumnList.vue'
import { GlobalDataProps } from '../store'
interface ColumnsParams {
  pageIndex: number;
  pageSize: number;
}
export default defineComponent({
  name: 'Home',
  components: {
    ColumnList
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const params: ColumnsParams = {
      pageIndex: 1,
      pageSize: 10
    }
    onMounted(() => {
      store.dispatch('fetchColumns', params)
    })
    const list = computed(() => store.state.columns)
    return {
      list
    }
  }
})
</script>

<style scoped>
</style>
