import myRequest from './myRequest'
export const defaults = (data = {}) => myRequest.get('/index/634171111', null,{isToken: true}) 
