import request from '@/utils/request'

export function getIndex(limit, page) {
  return request({
    url: '/seed',
    method: 'get',
    params: {
      limit,
      page
    }
  })
}
export function editSeed(id, form) {
  return request({
    url: '/seed/' + id,
    method: 'put',
    data: {
      cropname: form.cropname,
      name: form.name,
      feature: form.point1,
      quality: form.point2,
      keypoint: form.point3,
      img: form.img
    }
  })
}

export function addSeed(form) {
  return request({
    url: '/seed',
    method: 'post',
    data: {
      cropname: form.cropname,
      name: form.name,
      feature: form.point1,
      quality: form.point2,
      keypoint: form.point3,
      img: form.img
    }
  })
}
export function delSeed(id) {
  return request({
    url: '/seed/' + id,
    method: 'delete'
  })
}
