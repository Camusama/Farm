import request from '@/utils/request'

export function getIndex(limit, page) {
  return request({
    url: '/safety',
    method: 'get',
    params: {
      limit,
      page
    }
  })
}
export function editSafety(id, form) {
  return request({
    url: '/safety/' + id,
    method: 'put',
    data: {
      class: form.class,
      safety: form.safety,
      point1: form.point1,
      point2: form.point2,
      point3: form.point3,
      img: form.img
    }
  })
}

export function addSafety(form) {
  return request({
    url: '/safety',
    method: 'post',
    data: {
      class: form.class,
      safety: form.safety,
      point1: form.point1,
      point2: form.point2,
      point3: form.point3,
      img: form.img
    }
  })
}
export function delSafety(id) {
  return request({
    url: '/safety/' + id,
    method: 'delete'
  })
}
