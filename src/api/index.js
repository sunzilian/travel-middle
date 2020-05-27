/**
 * api 请求接口统一管理
 */

// import your api module from ./modules, example:
import exampleModule from './modules/example';

const parseParams = (uri, params) => {
  const paramsArray = []
  Object.keys(params).forEach(key => params[key] && paramsArray.push(`${key}=${params[key]}`))
  if (uri.search(/\?/) === -1) {
    uri += `?${paramsArray.join('&')}`
  } else {
    uri += `&${paramsArray.join('&')}`
  }
  return uri
}



const ajax = function (type, params = {
  data: null
}) {
  // const base_url = 'http://0d05825f.ngrok.io';
  const base_url = 'http://ce9f9f5b.ngrok.io';
  let Ruq_URL = base_url;

  if (type === 'get') {
    Ruq_URL = `${base_url}${parseParams(params.url, params.data)}`
    params.data = null
  } else if (type === 'post') {
    Ruq_URL += params.url
    params.data = JSON.stringify(params.data)
  }
  console.log(Ruq_URL, params);
  return new Promise((res, rej) => {
    var ajax = new XMLHttpRequest();
    // 第二步： 设置状态监听函数
    ajax.onreadystatechange = function () {
      // console.log(ajax.readyState,111);
      // console.log(ajax.status);
      // 第五步：在监听函数中，判断readyState=4 && status=200表示请求成功
      if (ajax.readyState == 4 && ajax.status == 200) {
        console.log(ajax, 888888);
        // if (ajax.readyState == 4 ) {
        // 第六步： 使用responseText、responseXML接受响应数据，并使用原生JS操作DOM进行显示
        console.log(ajax.responseText);
        // console.log(ajax.responseXML); // 返回不是XML，显示null
        // console.log(JSON.parse(ajax.responseText));
        // console.log(eval("(" + ajax.responseText + ")"));
        res(JSON.parse(ajax.responseText || "{}"))
      } else if (ajax.readyState == 4 && ajax.status !== 200) {
        rej(JSON.parse(ajax.responseText))
      }
    }
    // 第三步： open一个链接
    ajax.open(type, Ruq_URL, true); //true异步请求，false同步// 第四步： send一个请求。 可以发送对象和字符串，不需要传递数据发送null
    ajax.setRequestHeader("token", window.localStorage.getItem('token') || '');
    ajax.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    ajax.send(params.data);
    // ajax.send({
    //   // commnet: JSON.stringify(params.data)
    //   commnet: JSON.stringify(params.data)
    // });
  })
}

const get = params => ajax('get', params)

const post = params => ajax('post', params);


export default {
  // your api modules，example:
  exampleModule,
  ajax,
  get,
  post
  
}
