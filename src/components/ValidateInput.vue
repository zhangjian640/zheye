 <template>
  <div class="validate-input-container pb-3">
    <input
    v-if="tag !== 'textarea'"
    v-model="inputRef.val"
    class="form-control"
    :class="{'is-invalid': inputRef.error}"
    @blur="validateInput"
    @input="updateValue"
    v-bind="$attrs"
    />
    <textarea
      v-else
      class="form-control"
      v-model="inputRef.val"
      :class="{'is-invalid': inputRef.error}"
      @blur="validateInput"
      @input="updateValue"
      v-bind="$attrs"
    />
    <span v-if="inputRef.error" class="invalid-feedback">{{ inputRef.message }}</span>
  </div>
</template>
<script lang='ts'>
import { reactive, defineComponent, PropType, onMounted } from 'vue'
import emitter from '../utils/emitter'
export interface RuleProp {
  type: 'required' | 'email';
  message: string;
}
export type TagType = 'input' | 'textarea'
export type RulesProp = RuleProp[]
export default defineComponent({
  name: 'ValidateInput',
  props: {
    rules: {
      type: Array as PropType<RulesProp>
    },
    modelValue: String,
    tag: {
      type: String as PropType<TagType>,
      default: 'input'
    }
  },
  inheritAttrs: false,
  setup (props, context) {
    const inputRef = reactive({
      val: props.modelValue || '',
      error: false,
      message: ''
    })
    const updateValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value
      inputRef.val = targetValue
      context.emit('update:modelValue', targetValue)
    }
    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every(rule => {
          let passed = true
          inputRef.message = rule.message
          switch (rule.type) {
            case 'required':
              passed = (inputRef.val.trim() !== '')
              break
            case 'email':
              const pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/ // eslint-disable-line
              passed = pattern.test(inputRef.val)
              break
            default:
              break
          }
          return passed
        })
        inputRef.error = !allPassed
        return allPassed
      }
      return true
    }
    onMounted(() => {
      emitter.emit('form-item-created', validateInput)
    })
    return {
      inputRef,
      validateInput,
      updateValue
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
