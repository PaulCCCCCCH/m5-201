# Vue 组件交流

## Props down

父组件通过 props 向下传递数据给子组件

组件实例的作用域是孤立的。这意味着不能（也不应该）在子组件的模板中直接饮用父组件的数据。要让子组件使用父组件的数据，需要通过子组件的 props 选项

1. 静态 props
    
    
    组件实例的作用域是孤立的。这意味着不能（也不应该）在子组件的模板中直接饮用父组件的数据。要让子组件使用父组件的数据，需要通过子组件的 props 选项。
    
    ```php
    Vue.component('blog-post', {
      // 在 JavaScript 中是 camelCase 的
      props: ['postTitle'],
      template: '<h3>{{ postTitle }}</h3>'
    })
    ```
    
    注意 : props 是 **字符串数组**
    
    通过在父组件调用子组件的 block 中声明对应 props 传递参数
    
    ```php
    <blog-post post-title="hello!"></blog-post>
    ```
    
2. 动态 props
    
    
    在模板中，要动态地绑定父组件的数据到子组件模板的 props，和绑定 Html 标签特性一样，使用 `v-bind` 绑定
    
    ```php
    <blog-post v-bind:post-title="myPostTitle"></blog-post>
    ```
    
    注意 ：props 是单向绑定的：当父组件的属性变化时，将传导给子组件，但是不会反过来。这是为了防止子组件五一修改父组件的状态。
    

## Events up

子组件通过 events ( 自定义事件 ) 给父组件发送消息

```php
buttonClicked() {
this.$emit('button-clicked',this.targetDeliveryNum, ..);
}
```

父组件通过监听对应事件获取参数

```php
<deliveryInfowindow v-bind:title="myTitle" v-on:button-clicked="submitTargetDeliveryNum">
...
submitTargetDeliveryNum(inputData) {
                console.log(inputData, ..);
            },
```

                                                                                                                                         by KobeNorris