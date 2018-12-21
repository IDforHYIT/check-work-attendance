import axios from 'axios'
import store from '@/store'
import router from '@/router'
import {
  Message
} from 'iview'
import {
  getToken
} from '@/libs/util'
// import { Spin } from 'iview'
class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //服务器接受验证的token
        Authorization: `Bearer ${getToken()}`
      }
    }
    return config
  }
  distroy(url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.distroy(url)
      const {
        data,
        status
      } = res
      // return { data, status }
      //对后端返回数据做处理
      // debugger
      if (data.result) {
        return data;
      } else {
        Message.error(data.error);
        return Promise.reject(data.error);
      }
    }, error => {
      Message.error(error.response.data.message);
      //用户登陆过期，退到登陆界面
      if (error.response.status === 401) {
        store.dispatch('handleLogOut').then(() => {
          router.push({
            name: 'login'
          })
        });
      }
      this.distroy(url)
      return Promise.reject(error.response.data)
    })
  }
  request(options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
