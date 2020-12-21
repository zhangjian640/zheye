import request from '@/utils/request'
import { ColumnProps } from '@/store'
interface ColumnsParams {
  pageIndex: number;
  pageSize: number;
}

// 分类列表
export function getColumns (query: ColumnsParams) {
  return request({
    url: '/columns',
    method: 'get',
    params: query
  })
}

// 创建分类
export function createColumnRequest (data: ColumnProps) {
  return request({
    url: '/create',
    method: 'post',
    data
  })
}

// 博客列表
export function getColumn (cid: string) {
  return request({
    url: `/columns/${cid}`,
    method: 'get'
  })
}

// 博客详情
export function getPosts (cid: string, params: ColumnsParams) {
  return request({
    url: `/columns/${cid}/posts`,
    method: 'get',
    params
  })
}
