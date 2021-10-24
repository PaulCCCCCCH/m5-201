# Axios 和 Promise

有很多时候你在构建应用时需要访问一个 API 并展示其数据。做这件事的方法有好几种，而使用基于 `promise` 的 HTTP 客户端 `axios` 则是其中非常流行的一种。

1. 什么是 `promise` ？
    
    在JavaScript的世界中，所有代码都是单线程执行的。由于这个“缺陷”，导致JavaScript的所有网络操作，浏览器事件，都必须是**异步执行**（**异步执行**可以用回调函数实现）（**AJAX**）。
    
    ```jsx
    new Promise(test).then(function (result) {
        console.log('成功：' + result);
    }).catch(function (reason) {
        console.log('失败：' + reason);
    });
    ```
    
2. 什么是 `axios` ？
    
    下面是一个 `axios` 的例子
    
    ```jsx
    buttonClicked () {
        axios
          .get('https://somewhereontheinternet')
          .then(response => return ("Do sth after get the" response.data))
    			.catch(error => console.log(error))
    			.finally(() => "Do sth in the end")
      }
    ```
    
    其中
    
    ```jsx
    response => return ("Do sth after get the" response.data)
    ```
    
    是一个 lambda 函数，即匿名函数，其取 response 作为其输入参数，并运行 `=>` 之后的命令
    
    ```jsx
    .get('https://somewhereontheinternet')
    ```
    
    `.get( ... )` 即访问哪一个 API
    
    `.then( ... )` 即访问成功后对 `response` 如何处理
    
    `.catch( ... )` 即访问报错后对 `error` 如何处理
    
    `.finally( ... )` 即访问结束之前作何处理
    
    ... More to go ...
    
    ### **安装axios**
    
    使用npm
    
    ```
    $ npm install axios
    ```
    
    在 `main.js` 里写
    
    ```jsx
    import axios from 'axios';
    Vue.prototype.$axios = axios;
    
    ```
    
    然后将上述代码改成
    
    ```jsx
    sendGet() {
            this.$axios.get('....')
    
    ```
    
    其实 `axios` 可以做到的事情不只是访问和展示一个 API。你也可以和 Serverless Function 通信，向一个有写入权限的 API 发送 发布 / 编辑 / 删除 请求等等。
    
                                                                                                                             by KobeNorris