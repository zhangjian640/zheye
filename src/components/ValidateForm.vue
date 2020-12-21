 <template>
  <div class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent, onUnmounted } from 'vue'
import emitter from '../utils/emitter'
type ValidateFunc = () => boolean
export default defineComponent({
  name: 'ValidateForm',
  emits: ['form-submit'],
  setup (props, context) {
    let funArr: ValidateFunc[] = []
    const submitForm = () => {
      const result = funArr.map(func => func()).every(result => result)
      context.emit('form-submit', result)
    }
    const callback = (func?: ValidateFunc) => {
      if (func) {
        funArr.push(func)
      }
    }
    emitter.on('form-item-created', callback)
    onUnmounted(() => {
      emitter.off('form-item-created', callback)
      funArr = []
    })
    return {
      submitForm
    }
  }
})
</script>
 <style>
</style>
