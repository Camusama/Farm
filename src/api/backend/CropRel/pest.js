import request from '@/utils/request'

export function getIndex(limit, page) {
  return request({
    url: '/pest',
    method: 'get',
    params: {
      limit,
      page
    }
  })
}
export function editPest(id, form) {
  return request({
    url: '/pest/' + id,
    method: 'put',
    data: {
      cropname: form.cropname,
      name: form.name,
      summary: form.point1,
      feature: form.point2,
      keypoint: form.point3,
      img: form.img
    }
  })
}

export function addPest(form) {
  return request({
    url: '/pest',
    method: 'post',
    data: {
      cropname: form.cropname,
      name: form.name,
      summary: form.point1,
      feature: form.point2,
      keypoint: form.point3,
      img: form.img
    }
  })
}
export function delPest(id) {
  return request({
    url: '/pest/' + id,
    method: 'delete'
  })
}
