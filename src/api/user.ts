import request from '@/utils/request'

interface LoginParams {
  email: string;
  password: string;
}

// 博客列表
export function fetchLogin (data: LoginParams) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
