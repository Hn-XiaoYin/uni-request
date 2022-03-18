import Request from './request'
import config from "./config"
import {toMessage} from "../common/utils"
const request = (config) => {
  //请求拦截器，添加请求效果，比如正在加载，然后添加token认证之类的
  uni.showLoading({
    title: 'loading...',
    mask: true
  })

  let token = "";
  if (config.isToken && token) {
    config.header.Authorization = token
  }
  return config;
}

const response = (res) => {
	//响应拦截器，这儿取消了请求的转圈，可以对请求结果进行统一处理。
	try{
		uni.hideLoading()
		const {code, message} = res.data;
		if(res.statusCode !== 200 ){
			toMessage.toast(res.errMsg);
			return {code:res.data.code}
		}else if(parseInt(res.data.code) !== 200){
			toMessage.toast(message);
			return res.data
		}
		return res.data;
	}catch(error){
		toMessage.toast(error);
		//TODO handle the exception
		return {code:500};
	}
	
}

const myRequest = new Request({
  baseURL: config.baseUrl,
  isToken: false,
  header: {
    'content-type': 'application/json'
  },
  method: 'GET',
  dataType: 'json',
   // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // default
  timeout: 8000,
  request,
  response
})

export default myRequest
