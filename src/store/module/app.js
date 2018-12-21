import {
  getBreadCrumbList,
  setTagNavListInLocalstorage,
  getMenuByRouter,
  getTagNavListFromLocalstorage,
  getHomeRoute,
  routeHasExist,
  handleSysMenu
} from '@/libs/util'
import routers from '@/router/routers'
import {
  getSysMenuList
} from "@/api/data";
export default {
  state: {
    routers: routers,
    breadCrumbList: [],
    tagNavList: [],
    homeRoute: getHomeRoute(routers),
    local: ''
  },
  getters: {
    menuList: (state, getters, rootState) => getMenuByRouter(state.routers, rootState.user.access)
  },
  mutations: {
    setSysMenu(state, sysMenu) {
      handleSysMenu(state.routers, sysMenu)
    },
    setBreadCrumb(state, routeMetched) {
      state.breadCrumbList = getBreadCrumbList(routeMetched, state.homeRoute)
    },
    setTagNavList(state, list) {
      if (list) {
        state.tagNavList = [...list]
        setTagNavListInLocalstorage([...list])
      } else state.tagNavList = getTagNavListFromLocalstorage()
    },
    addTag(state, {
      route,
      type = 'unshift'
    }) {
      if (!routeHasExist(state.tagNavList, route)) {
        if (type === 'push') state.tagNavList.push(route)
        else {
          if (route.name === 'home') state.tagNavList.unshift(route)
          else state.tagNavList.splice(1, 0, route)
        }
        setTagNavListInLocalstorage([...state.tagNavList])
      }
    },
    setLocal(state, lang) {
      state.local = lang
    }
  },
  actions: {
    getSysMenu({
      state,
      commit
    }) {
      return new Promise((resolve, reject) => {
        getSysMenuList().then(res => {
          //处理数据
          commit('setSysMenu', res.data)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  },
}
