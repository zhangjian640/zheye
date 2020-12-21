<template>
  <div class="create-post-page">
    <h4>{{isEditMode ? '编辑专栏' : '新建专栏'}}</h4>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">专栏标题：</label>
        <validate-input
          :rules="titleRules"
          v-model="titleVal"
          placeholder="请输入专栏标题"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">专栏描述：</label>
        <validate-input
          rows="10"
          tag="textarea"
          placeholder="请输入专栏描述"
          :rules="descriptionRules"
          v-model="descriptionVal"
        />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">{{isEditMode ? '更新专栏' : '发表专栏'}}</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import { GlobalDataProps, ColumnProps } from '../store'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'CreateColumn',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const titleVal = ref('')
    const descriptionVal = ref('')
    const avatarVal = ref('')
    const route = useRoute()
    const router = useRouter()
    const store = useStore<GlobalDataProps>()
    const isEditMode = !!route.query.id
    const titleRules: RulesProp = [
      { type: 'required', message: '专栏标题不能为空' }
    ]
    const descriptionRules: RulesProp = [
      { type: 'required', message: '专栏描述不能为空' }
    ]
    const onFormSubmit = () => {
      const { id } = store.state.user
      if (id) {
        const newPost: ColumnProps = {
          title: titleVal.value,
          description: descriptionVal.value,
          author: id,
          avatar: avatarVal.value
        }
        store.dispatch('createColumn', newPost).then(res => {
          if (res) {
            router.push({ name: 'home' })
          }
        })
      }
    }
    return {
      titleRules,
      titleVal,
      descriptionVal,
      descriptionRules,
      onFormSubmit,
      isEditMode
    }
  }
})
</script>
<style>
.create-post-page .file-upload-container {
  height: 200px;
  cursor: pointer;
  overflow: hidden;
}
.create-post-page .file-upload-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.uploaded-area {
  position: relative;
}
.uploaded-area:hover h3 {
  display: block;
}
.uploaded-area h3 {
  display: none;
  position: absolute;
  color: #999;
  text-align: center;
  width: 100%;
  top: 50%;
}
</style>
