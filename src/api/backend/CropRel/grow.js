import request from '@/utils/request'

export function getIndex(limit, page) {
  return request({
    url: '/grow',
    method: 'get',
    params: {
      limit,
      page
    }
  })
}
export function editGrow(id, form) {
  return request({
    url: '/grow/' + id,
    method: 'put',
    data: {
      cropname: form.cropname,
      name: form.name,
      point1: form.point1,
      point2: form.point2,
      point3: form.point3,
      img: form.img
    }
  })
}

export function addGrow(form) {
  return request({
    url: '/grow',
    method: 'post',
    data: {
      cropname: form.cropname,
      name: form.name,
      point1: form.point1,
      point2: form.point2,
      point3: form.point3,
      img: form.img
    }
  })
}
export function delGrow(id) {
  return request({
    url: '/grow/' + id,
    method: 'delete'
  })
}
