import request from '@/utils/request'

export function algorithmQuery() {
  return request({
    url: '/algorithm-query',
    method: 'get'
  })
}

export function algorithmRun(data) {
  return request({
    url: '/algorithm-run',
    method: 'post',
    data
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
