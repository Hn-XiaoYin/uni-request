class Request {
  constructor(config) {
    this.config = {
      baseURL: config.baseURL || '',
      header: config.header || {
        'content-type': 'application/json'
      },
      method: config.method || 'GET',
      timeout: config.timeout || 15000,
      dataType: config.dataType || 'json',
      responseType: config.responseType || 'text',
	  isToken: config.isToken || false
    }
    this.interceptors = {
      request: config.request,
      response: config.response
    }
  }
  request(option) {
    let config = this.config,
      interceptors = this.interceptors;
    //如果有请求拦截器
    if (interceptors.request) {
      config = interceptors.request({...config,...option})
    }
    let newOption = {
      url: config.baseURL + config.url,
      data: config.data,
      header: config.header || option.header,
      method: config.method || option.method,
      timeout: config.timeout || option.timeout,
      dataType: config.dataType || option.dataType,
      responseType: config.responseType || option.responseType,
	  isToken: config.isToken || false,
    }
	console.log(newOption)
    return new Promise((resolve, reject) => {
      newOption.complete = (res) => {
        //响应拦截器
        interceptors.response ? res = interceptors.response(res) : ''
        let isResolved = res.code === 200
        isResolved ? resolve(res) : reject(res)
      }
      uni.request({ ...newOption })
    })
  }

  get(url, data, option = {}) {
    option.url = url;
    option.data = data;
    option.method = 'GET';
    return this.request(option)
  }
  post(url, data, option = {}) {
    option.url = url;
    option.data = data;
    option.method = 'POST';
    return this.request(option)
  }
}

export default Request

/**
 config = {
   baseURL: '',
   header: {
     'content-type': 'application/json'
   },
   method: 'GET',
   timeout: 15000,
   dataType: 'json',//如果设为 json，会尝试对返回的数据做一次 JSON.parse
   responseType: 'text',//设置响应的数据类型。合法值：text、arraybuffer
   response,//请求拦截器，类型，函数
   response,//响应拦截器，类型，函数
 }
 */
