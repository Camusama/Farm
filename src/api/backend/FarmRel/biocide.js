import request from '@/utils/request'

export function getIndex(limit, page) {
  return request({
    url: '/biocide',
    method: 'get',
    params: {
      limit,
      page
    }
  })
}
export function editBiocide(id, form) {
  return request({
    url: '/biocide/' + id,
    method: 'put',
    data: {
      class: form.class,
      name: form.name,
      summary: form.summary,
      warn: form.warn,
      usage: form.usage,
      img: form.img
    }
  })
}

export function addBiocide(form) {
  return request({
    url: '/biocide',
    method: 'post',
    data: {
      class: form.class,
      name: form.name,
      summary: form.summary,
      warn: form.warn,
      usage: form.usage,
      img: form.img
    }
  })
}
export function delBiocide(id) {
  return request({
    url: '/biocide/' + id,
    method: 'delete'
  })
}
