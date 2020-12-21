 <template>
    <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
      <router-link class="navbar-brand" to="/">者也专栏</router-link>
      <ul v-if="!user.isLogin" class="list-inline mb-0">
        <li class="list-inline-item">
          <router-link class="btn btn-outline-light my-2" to="/login">登录</router-link>
        </li>
        <li class="list-inline-item">
          <router-link class="btn btn-outline-light my-2" to="/login">注册</router-link>
        </li>
      </ul>
      <ul v-else class="list-inline mb-0">
        <li>
          <dropdown :title="`你好，${user.name}`">
            <dropdown-item>
              <router-link class="dropdown-item"  to="/create-column">新建专栏</router-link>
            </dropdown-item>
            <dropdown-item :disabled="true"><a class="dropdown-item" href="#">编辑资料</a></dropdown-item>
            <dropdown-item><a class="dropdown-item" href="#">退出登录</a></dropdown-item>
          </dropdown>
        </li>
      </ul>
    </nav>
</template>
<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'
export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}
export default defineComponent({
  name: 'GlobalHeader',
  components: {
    Dropdown,
    DropdownItem
  },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
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
