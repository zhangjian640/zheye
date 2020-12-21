 <template>
  <li class="dropdown-options" :class="{'disabled': disabled}">
    <slot></slot>
  </li>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'DropdownItem',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    console.log(props)
  }
})
</script>

 <style>
 .dropdown-options.disabled * {
   color: #6c757d;
   pointer-events: none;
   background-color: transparent;
 }
</style>
