import request from '@/utils/request'

export function getIndex(limit, page) {
  return request({
    url: '/weather',
    method: 'get',
    params: {
      limit,
      page
    }
  })
}
export function editWeather(id, form) {
  return request({
    url: '/weather/' + id,
    method: 'put',
    data: {
      class: form.class,
      disaster: form.disaster,
      point1: form.point1,
      point2: form.point2,
      point3: form.point3,
      img: form.img
    }
  })
}

export function addWeather(form) {
  return request({
    url: '/weather',
    method: 'post',
    data: {
      class: form.class,
      disaster: form.disaster,
      point1: form.point1,
      point2: form.point2,
      point3: form.point3,
      img: form.img
    }
  })
}
export function delWeather(id) {
  return request({
    url: '/weather/' + id,
    method: 'delete'
  })
}
