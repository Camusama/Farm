import request from '@/utils/request'

export function getCrop () {
  return request({
    url: '/common/getCrop',
    method: 'get'
  })
}
