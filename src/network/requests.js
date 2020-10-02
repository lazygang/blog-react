import axios from "axios";
// import {
//     message
// } from 'antd';
axios.defaults.retry = 4;
axios.defaults.retryCount = 4;
axios.defaults.retryDelay = 5000;


// const handelError = (res) => {
//     let error = res.response;
//     if (error !== undefined) {
//         if (error.status === 403) {
//             window.localStorage.clear();
//             window.location.reload()
//         } else if (error.status === 500) {
//             message.error(error.status +"服务出错!");
//         } else if (error.status === 404) {
//             message.error(error.status +"未找到接口!");
//         }
//     } else {
//         message.error("网络错误！")
//     }
// }


const Axios = axios.create({
    baseURL: 'http://localhost:5000/',
    // 下面两个属性，用来设置，请求失败或者超时，自动重新请求的次数和间隙时间
    retry: 4, // 请求次数
    retryInterval: 3000, // 请求间隙
    timeout: 50000,
    retryCount: 4,
    // contentType: 'application/json;charset=UTF-8',
    // contentType: 'application/x-www-form-urlencoded; charset=UTF-8'

});

//请求前拦截
Axios.interceptors.request.use(config => {
    //     let token = window.localStorage.getItem("token");
    //     config.headers['jms-token'] = token;
    //     // config.headers['contentType']='application/json;charset=UTF-8';
        return config
    // },
    // function (error) {
    //     console.log(error)
    //     return Promise.reject(error)
    }
);
//请求后返回数据拦截
Axios.interceptors.response.use(res => {
        return res
    },
    // function axiosRetryInterceptor(res) {
    //     handelError(res)
    //     // let config = res.config;

    //     // 如果配置不存在或重试属性未设置，抛出promise错误
    //     // if (!config || !config.retry) {
    //     //     return Promise.reject(res);
    //     // }
    //     // 设置一个变量记录重新请求的次数
    //     // config.retryCount = config.retryCount || 0;
    //     // // 检查重新请求的次数是否超过我们设定的请求次数
    //     // if (config.retryCount >= config.retry) {
    //     //     return Promise.reject(res);
    //     // }
    //     // //重新请求的次数自增
    //     // config.retryCount += 1;
    //     // console.log(config.retryCount)
    //     // // 创建新的Promise来处理重新请求的间隙
    //     // let back = new Promise(function (resolve) {
    //     //     console.log("接口" + config.url + "请求超时，重新请求")
    //     //     setTimeout(function () {
    //     //         resolve();
    //     //     }, config.retryInterval || 3000);
    //     // });
    //     // //返回axios的实体，重试请求
    //     // return back.then(function () {
    //     //     return Axios(config);
    //     // });
    // },
);


export default Axios;
