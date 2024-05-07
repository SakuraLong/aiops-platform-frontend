import request from '@/utils/request'
// metric数据导出
export function downloadMetric(params) {
  return request({
    url: '/metricexport',
    method: 'get',
    responseType: 'blob',
    params
  })
}

// metric数据删除
export function deleteMetric(params) {
  return request({
    url: '/metriczipdelete',
    method: 'delete',
    params
  })
}

export function getMetric(params) {
  return request({
    url: '/metric',
    method: 'get',
    params
  })
}
