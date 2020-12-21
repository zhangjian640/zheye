<template>
   <validate-form @form-submit="onFormSubmit">
    <div class="mb-3">
      <label class="form-label">邮箱</label>
      <validate-input v-model="emailVal" :rules="emailRules" placeholder="请输入邮箱地址" type="text" />
    </div>
    <div class="mb-3">
      <label class="form-label">密码</label>
      <validate-input v-model="passwordVal" :rules="passwordRules" placeholder="请输入密码" type="password" />
    </div>
    <template #submit>
      <button type="submit" class="btn btn-primary">Submit</button>
    </template>
  </validate-form>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
interface LoginParams {
  email: string;
  password: string;
  isLogin?: boolean;
}
export default defineComponent({
  name: 'Login',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const router = useRouter()
    const emailVal = ref('')
    const passwordVal = ref('')
    const { dispatch } = useStore()

    const emailRules: RulesProp = [
      {
        type: 'required',
        message: '邮箱地址不能为空'
      },
      {
        type: 'email',
        message: '邮箱格式不正确'
      }
    ]
    const passwordRules: RulesProp = [
      {
        type: 'required',
        message: '密码不能为空'
      }
    ]
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const data: LoginParams = {
          email: emailVal.value,
          password: passwordVal.value,
          isLogin: true
        }
        dispatch('login', data)
        router.push('/')
      }
    }
    return {
      emailRules,
      emailVal,
      passwordVal,
      passwordRules,
      onFormSubmit
    }
  }
})
</script>

<style scoped>
</style>
