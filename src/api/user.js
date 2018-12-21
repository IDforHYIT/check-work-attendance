import axios from '@/libs/api.request'

export const login = (payload) => {
  return axios.request({
    url: '/Account/Authenticate',
    data:payload,
    method: 'post'
  })
}
export const register = (user) => { 
  return axios.request({
    url: '/user',
    data:user,
    method: 'post'
  })
}

export const getUserInfo = (userGuid) => {
  return axios.request({
    url: '/User/Get',
    params: {
      id:userGuid
    },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: '/user/access/logout',
    method: 'get'
  })
}
