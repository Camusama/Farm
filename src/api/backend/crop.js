import request from '@/utils/request'

export function getIndex (limit, page) {
  return request({
    url: '/crop',
    method: 'get',
    params: {
      limit,
      page
    }
  })
}
export function editCrop (id, form) {
  return request({
    url: '/crop/' + id,
    method: 'put',
    data: {
      name: form.name,
      summary: form.summary,
      img: form.img
    }
  })
}

export function addCrop (form) {
  return request({
    url: '/crop',
    method: 'post',
    data: {
      name: form.name,
      summary: form.summary,
      img: form.img
    }
  })
}
export function delCrop (id) {
  return request({
    url: '/crop/' + id,
    method: 'delete'
  })
}
