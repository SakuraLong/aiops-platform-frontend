import request from '@/utils/request'

export function algorithmQuery(params) {
  return request({
    url: '/algorithm-query',
    method: 'get',
    params
  })
}

export function algorithmRun(params) {
  return request({
    url: '/algorithm-query',
    method: 'post',
    params
  })
}

export function algorithmResultQuery() {
  return request({
    url: '/algorithm-result-query',
    method: 'get'
  })
}

export function algorithmResultDetail(params) {
  return request({
    url: '/algorithm-result-detail',
    method: 'get',
    params
  })
}

export function algorithmInterrupt(params) {
  return request({
    url: '/algorithm-interrupt',
    method: 'delete',
    params
  })
}

export function algorithmResultDelete(params) {
  return request({
    url: '/algorithm-result-delete',
    method: 'delete',
    params
  })
}
