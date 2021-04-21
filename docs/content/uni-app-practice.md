# Uni-app 联调练习

## 需求
使用 uni-app 向接口发送信息，根据返回的值，展示商品信息。  
页面需要有输入框，需要从输入框获取用户输入的商品 `id`  
页面需要有获取按钮。点击获取可以获取 `id` 为用户输入值的商品信息。  
注意，有一定概率接口返回错误 (`500 internal server error`)，请正确处理。
<br>

## 接口信息
以下接口可以用来获取一个商品的数据。  
```
http://icewould.com:5201/getProduct?id=<id>
``` 

比如，`http://icewould.com:5201/getProduct?id=100` 会查询 `id` 是 `100` 的商品信息。

## 部分代码参考
[点击这里下载](../code/reference.zip)


