# Vue 模板语法

最后，让我们了解下 Vue 的语法 : 插值 和 指令

## 插值

望文生义，即插入（绑定）变量的方法

1. **文本**
    
    使用“Mustache”语法 (双大括号) 进行文本插值 `{{ ... }}`
    
    ```html
    <span>Message: {{ msg }}</span>
    ```
    
    `{{ msg }}` 标签将会被替代为对应组件实例中 msg property 的值,无论何时，绑定的组件实例上 msg property 发生了改变，插值处的内容都会更新。
    
2. **原始 HTML**
    
    双大括号会将数据解释为普通文本，而非 HTML 代码，可以使用 `v-html` 指令输出 HTML 代码
    
    ```html
    <p>Using mustaches: {{ rawHtml }}</p><p>
    Using v-html directive: <span v-html="rawHtml"></span></p>
    ```
    
    这个 `span` 的内容将会被替换成为 property 值 `rawHtml`，直接作为 HTML，但同时会忽略解析 property 值中的数据绑定
    
3. **Attribute**
    
    Mustache 语法不能在 HTML attribute 中使用，然而，可以使用 `v-bind` 指令
    
    ```html
    <div v-bind:id="dynamicId"></div>
    ```
    
    如果绑定的值是 `null` 或 `undefined`，那么该 attribute 将不会被包含在渲染的元素上。
    

## 指令

指令 (Directives) 是带有 v- 前缀的特殊 attribute，其职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM

1. **参数**
    
    一些指令能够接收一个“参数”，在指令名称之后以冒号表示
    
    1.  `v-bind`
        
        用于响应式地更新 HTML attribute :  伴随 实例 属性值变化，更新绑定的 HTML 属性值
        
        格式 : `v-bind :`**HTML Attribute 名 `= "`实例属性名`"`**
        
        ```html
        <a v-bind:href="url"> ... </a>
        ```
        
    2. `v-on`
        
        用于监听 DOM 事件 ：
        
        格式 : `v-on :`**事件名** `= "`**函数名`"`**
        
        ```html
        <a v-on:click="doSomething"> ... </a>
        ```
        
        若需访问原始的 DOM 事件，可用 `$event` 传入原始DOM事件 
        
        ```html
        <input v-on:input="message = $event.target.value">
        ```
        
2. **动态参数**
    
    Vue 也支持在指令参数中使用 JS 表达式
    
    格式 : `v-bind :[` **JS 表达式**`] =**"`实例属性名`"`**
    
    ```html
    <a v-bind:[attributeName]="url"> ... </a>
    <a v-on:[eventName]="doSomething"> ... </a>
    ```
    
    若在 data property 中有 `attributeName`，其值为 `"href"`，那么这个绑定将等价于 `v-bind:href` ，同时可以改变 `attributeName` 的值进行动态绑定
    
3. **修饰符**
    
    修饰符 (modifier) 是以半角句号 `.` 指明的特殊后缀，用于指出一个指令应该以**特殊方式绑定**
    
    格式 : **指令名**`:`**指令参数**`.`**修饰符** `=**"`对应表达式`"`**
    
    ```html
    <form v-on:submit.prevent="onSubmit">...</form>
    ```
    
    `.prevent` 修饰符告诉 `v-on` 指令不触发 submit 的默认操作
    
    修饰符也可以串联
    
    ```html
    <a v-on:click.stop.prevent="doThat"></a>
    ```
    

## 条件渲染和列表渲染

既然 Vue 不允许直接操作 DOM 那我应该如何通过操作 Vue 暴露给我们的接口，动态调整我们网页的主体结构呢？

1. 条件渲染 `v-if`
    
    望文生义，用于条件性渲染内容，该内容只在指令的表达式返回 `truthy` 值时被渲染。
    
    ```html
    <h1 v-if="awesome">Vue is awesome!</h1>
    ```
    
    也可以用 `v-else` 和 `v-else-if` 添加一个“else 块”：
    
    ```html
    <h1 v-if="awesome">Vue is awesome!</h1>
    <h1 v-else-if="notBad">Ok ...</h1>
    <h1 v-else>Oh no 😢</h1>
    ```
    
    vs `v-show`? 有什么好处？【高效，去重复渲染】
    
    More to go...
    
    [条件渲染 - Vue.js](https://cn.vuejs.org/v2/guide/conditional.html)
    
2. 列表渲染 `v-for`
    
    `v-for` 指令基于一个数组来渲染一个列表。`v-for` 指令需要使用 `item in items` 形式的特殊语法，其中 `items` 是源数据数组，而 `item` 则是被迭代的数组元素的别名
    
    ```html
    <ul id="example-1">
      <li v-for="item in items" :key="item.message">
        {{ item.message }}
      </li>
    </ul>
    ```
    
    ```jsx
    var example1 = new Vue({
      el: '#example-1',
      data: {
        items: [
          { message: 'Foo' },
          { message: 'Bar' }
        ]
      }
    })
    ```
    
    More to go...
    
    [列表渲染 - Vue.js](https://cn.vuejs.org/v2/guide/list.html)
    

                                                                                                                                         By KobeNorris