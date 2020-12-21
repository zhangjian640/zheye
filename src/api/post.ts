import request from '@/utils/request'
import { PostProps } from '@/store'

// 创建文章
export function createPostsRequest (data: PostProps) {
  return request({
    url: '/posts',
    method: 'post',
    data
  })
}
