import { createStore } from 'vuex'
import { getColumns, getColumn, getPosts, createColumnRequest } from '@/api/columns'
import { createPostsRequest } from '@/api/post'
import { fetchLogin } from '@/api/user'
import { setToken, getToken, setUserInfo, getUserInfo } from '@/utils/auth'
export interface UserProps {
  id?: string;
  isLogin: boolean;
  name?: string;
  columnId?: string;
}
export interface PostProps {
  id?: string;
  title: string;
  content: string;
  image?: string;
  createdAt?: string;
  author?: string;
  column: string;
}
export interface ColumnProps {
  id?: string;
  title: string;
  avatar?: string;
  author?: string;
  description: string;
}

export interface GlobalDataProps {
  loading: boolean;
  token: string;
  columns: ColumnProps[];
  user: UserProps;
  posts: PostProps[];
}

export interface ResponseData {
  errno: number;
  data: object;
}

const store = createStore<GlobalDataProps>({
  state: {
    loading: false,
    token: getToken(),
    user: getUserInfo(),
    columns: [],
    posts: []
  },
  actions: {
    async login ({ commit }, data) {
      const res = await fetchLogin(data)
      commit('login', res.data)
    },
    async createColumn ({ commit }, data) {
      await createColumnRequest(data)
      return true
    },
    async fetchColumns ({ commit }, params) {
      const res = await getColumns(params)
      commit('setColumns', res.data)
    },
    async fetchColumn ({ commit }, cid) {
      const res = await getColumn(cid)
      commit('setColumn', res.data)
    },
    async createPost ({ commit }, data) {
      await createPostsRequest(data)
      return true
    },
    async fetchPosts ({ commit }, { cid, pageIndex, pageSize }) {
      const res = await getPosts(cid, { pageIndex, pageSize })
      commit('setPosts', res.data)
    }
  },
  mutations: {
    login (state, data) {
      setToken(data.token)
      const userInfo = { ...state.user, isLogin: true, name: data.nickName || data.email, id: String(data.id) }
      setUserInfo(userInfo)
      state.user = userInfo
    },
    createPost (state, newPost) {
      state.posts.push(newPost)
    },
    setColumns (state, data) {
      state.columns = data.list
    },
    setColumn (state, data) {
      state.columns = [data]
    },
    setPosts (state, data) {
      state.posts = data.list
    },
    setLoading (state, status) {
      state.loading = status
    }
  },
  getters: {
    getColumnById: (state) => (id: string) => {
      return state.columns.find(c => String(c.id) === id)
    },
    getPostsByCid: (state) => (cid: string) => {
      return state.posts.filter(post => post.column === cid)
    },
    token: state => state.token
  }
})

export default store
