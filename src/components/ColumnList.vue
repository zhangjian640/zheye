 <template>
  <div class="row">
    <div class="col-4" v-for="column in columnList" :key="column.id">
      <div class="card h-100 shadow-sm" style="width: 18rem;">
        <div class="card-body">
          <img :src="column.avatar" class="card-img-top avatar round-circle border border-light w-25 my-3" :alt="column.title">
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-left">{{ column.description }}</p>
          <router-link class="btn btn-outline-primary" :to="`/column/${column.id}`">进入专栏</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { computed, defineComponent, PropType } from 'vue'
export interface ColumnProps {
  id: number;
  title: string;
  avatar?: string;
  description: string;
}
export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup (props) {
    const columnList = computed(() => {
      return props.list.map(column => {
        if (!column.avatar) {
          column.avatar = require('@/assets/logo.png')
        }
        return column
      })
    })
    return {
      columnList
    }
  }
})
</script>

 <style>
 .avatar {
   display: block;
   margin: 0 auto;
 }
</style>
