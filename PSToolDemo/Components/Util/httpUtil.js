/**
 * 数据请求工具
 * 
 * Created by pengsi on 2017/6/1.
 * @use example
 * import HTTPUtil from './../../utils/net/HttpUtils';
 * var params = {
 *      key:value
 * }
 * let result = await HTTPUtil.get(url, headers, params);
 * about post ，you need to construct an FormData object
 * let formData = new FormData();  
 * formData.append("name","admin");  
 * formData.append("password","admin123");  
 * 
 * let formData = new FormData();  
formData.append("id",1060);  
       
HTTPUtil.post(url,formData,headers).then((json) => {  
    //处理 请求success  
    if(json.code === 0 ){  
            //我们假设业务定义code为0时，数据正常  
        }else{  
             //处理自定义异常  
            this.doException(json);  
        }  
   },(json)=>{  
     //TODO 处理请求fail  
})  
 *
 *
 */
var HTTPUtil = {};

/**
 * Based on the fetch GET requests
 * @param url
 * @param headers
 * @param params {}
 * @returns {Promise}
 */
HTTPUtil.get = function (url, headers, params) {
    if (params) {
        let paramsArray = [];
        //encodeURIComponent
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&')
        } else {
            url += '&' + paramsArray.join('&')
        }
    }
    return new Promise(function (resolve, reject) {
        fetch(url, {
            method: 'GET',
            headers: headers,
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                reject({status: response.status})
            }
        }).then((response) => {
            resolve(response);
        }).catch((err) => {
            reject({status: -1});
        })
    })
}


/**
 * Based on the fetch POST requests  FormData 表单数据
 * @param url
 * @param headers
 * @param formData
 * @returns {Promise}
 */
HTTPUtil.post = function (url, headers, formData) {
    return new Promise(function (resolve, reject) {
        fetch(url, {
            method: 'POST',
            headers: headers,
            body: formData,
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                reject({status: response.status})
            }
        }).then((response) => {
            resolve(response);
        }).catch((err) => {
            reject({status: -1});
        })
    })
}
/**
 * Based on the fetch RestFul requests
 * @param url
 * @param headers
 * @param params
 * @returns {Promise}
 */
HTTPUtil.restful = function (url, headers, ...params) {
    //Processing the Url
    params.forEach(function (param) {
        if (url.search(/\?/) === -1) {
            url += '/' + param.toString();
        } else {
            url += param.toString();
        }
    });
    return new Promise(function (resolve, reject) {
        fetch(url, {
            method: 'GET',
            headers: headers,
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                reject({status: response.status})
            }
        }).then((response) => {
            resolve(response);
        }).catch((err) => {
            reject({status: -1});
        })
    });
}

HTTPUtil.getFetch = function (url, headers, params) {
    if (params) {
        let paramsArray = [];
        //encodeURIComponent
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&')
        } else {
            url += '&' + paramsArray.join('&')
        }
    }
    return fetch(url).json();
}


export default HTTPUtil;