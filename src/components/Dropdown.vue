 <template>
  <div class="dropdown" ref="dropdownRef">
    <a href="" class="btn btn-outline-light dropdown-toggle my-2" @click.prevent="toggleOpen">{{ title }}</a>
    <ul v-if="isOpen" class="dropdown-menu" style="display: block;">
      <slot></slot>
    </ul>
  </div>
</template>
<script lang='ts'>
import { defineComponent, ref, watch } from 'vue'
import useClickOutside from '../hooks/userClickOutside'
export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}
export default defineComponent({
  name: 'Dropdown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup (props) {
    console.log(props)
    const isOpen = ref(false)
    const dropdownRef = ref<null | HTMLElement>(null)
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    const isClickOutside = useClickOutside(dropdownRef)
    watch(isClickOutside, () => {
      if (isOpen.value && isOpen.value) {
        isOpen.value = false
      }
    })
    return {
      isOpen,
      toggleOpen,
      dropdownRef
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
