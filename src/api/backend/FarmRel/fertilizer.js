import request from '@/utils/request'

export function getIndex(limit, page) {
  return request({
    url: '/fertilizer',
    method: 'get',
    params: {
      limit,
      page
    }
  })
}
export function editFertilizer(id, form) {
  return request({
    url: '/fertilizer/' + id,
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

export function addFertilizer(form) {
  return request({
    url: '/fertilizer',
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
export function delFertilizer(id) {
  return request({
    url: '/fertilizer/' + id,
    method: 'delete'
  })
}
