import axios from '@/libs/api.request'

export const getTableData = () => {
  return axios.request({
    url: 'get_table_data',
    method: 'get'
  })
}

export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}
//获取角色列表
export const getRoleList = (payload) => {
  return axios.request({
    url: '/role',
    method: 'get',
    params: payload,
  })
}

//获取部门人员列表
export const getDepartInfoList = () => {
  return axios.request({
    url: 'departInfo/getTree',
    method: 'get',
  })
}
//获取用户列表
export const getUserList = (payload) => {
  return axios.request({
    url: '/User/get',
    method: 'get',
    params: payload
  })
}
//获取班次列表
export const getBanciList = () => {
  return axios.request({
    url: '/Banci/get',
    method: 'get',
  })
}
//获取时间段列表
export const getTimePartList = () => {
  return axios.request({
    url: 'TimePart/get',
    method: 'get',
  })
}
export const getDeviceList = (payload) => {
  return axios.request({
    url: '/User/get',
    method: 'get',
    params: payload
  })
}

//清空打卡记录
export const deleteDaKaList = () => {
  return axios.request({
    url: '/SweepSignRecord/delete',
    method: 'delete',
  })
}

//获取菜单列表
export const getSysMenuList = () => {
  return axios.request({
    url: '/MenuSetting/GetMenuPermissions',
    method: 'get',
  })
}

//获取菜单权限对应列表
export const getPermissionList = () => {
  return axios.request({
    url: '/NewRoles/GetNewPermission',
    method: 'get',
    params: {
      isMenu: true
    }
  })
}

//获取用户角色菜单权限对应列表
export const getNewPermission = () => {
  return axios.request({
    url: '/NewRoles/GetNewPermission',
    method: 'get'
  })
}
