import request from '@/utils/request'

export function getIndex(limit, page) {
  return request({
    url: '/users',
    method: 'get',
    params: {
      limit,
      page
    }
  })
}
export function editUser(id, form) {
  return request({
    url: '/users/' + id,
    method: 'put',
    data: {
      username: form.username,
      password: form.password
    }
  })
}

export function addUser(form) {
  return request({
    url: '/users',
    method: 'post',
    data: {
      username: form.username,
      password: form.password
    }
  })
}
export function delUser(id) {
  return request({
    url: '/users/' + id,
    method: 'delete'
  })
}
// export function getInfo(token) {
//   return request({
//     url: '/users/' + token,
//     method: 'get'
//   })
// }

// export function logout() {
//   return request({
//     url: '/users/logout',
//     method: 'post'
//   })
// }
