import request from '@/utils/request'

export function getGroundTruth(params) {
  return request({
    url: '/getgroundtruth',
    method: 'get',
    params
  })
}
