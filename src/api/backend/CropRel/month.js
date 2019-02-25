import request from '@/utils/request'

export function getIndex(limit, page) {
  return request({
    url: '/month',
    method: 'get',
    params: {
      limit,
      page
    }
  })
}
export function editMonth(id, form) {
  return request({
    url: '/month/' + id,
    method: 'put',
    data: {
      cropname: form.cropname,
      name: form.name,
      weather: form.point1,
      farm: form.point2,
      warn: form.point3,
      img: form.img
    }
  })
}

export function addMonth(form) {
  return request({
    url: '/month',
    method: 'post',
    data: {
      cropname: form.cropname,
      name: form.name,
      weather: form.point1,
      farm: form.point2,
      warn: form.point3,
      img: form.img
    }
  })
}
export function delMonth(id) {
  return request({
    url: '/month/' + id,
    method: 'delete'
  })
}
