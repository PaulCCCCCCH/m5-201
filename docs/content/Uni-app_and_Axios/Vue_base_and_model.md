# Vue 组件基础和模块

## 基本实例

以下是一个 Vue 组件的示例 （在典型 Vue 应用中，我们使用 **单个文件组件** 而不是 **字符串模板** ）：

```php
// 创建一个Vue 应用
const app = Vue.createApp({})

// 定义一个名为 button-counter 的新全局组件
app.component('button-counter', {
  data() {
    return {
      count: 0
    }
  },
  template: `
    <button @click="count++">
      You clicked me {{ count }} times.
    </button>`
})
```

组件是带有名称的 **可复用** 实例，在这个例子中是 `<button-counter>` 。我们可以把这个组件作为一个根实例 `app` 中的自定义元素来使用：

```php
<div id="components-demo">
  <button-counter></button-counter>
</div>

app.mount('#components-demo')
```

## 组件注册

为了使 Vue 能够识别并在模板中使用，这些组件必须先在实例中注册。

### 命名

推荐遵循 **[W3C 规范](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name)** 来给自定义标签命名：

1. 全部小写
2. 包含连字符 (及：即有多个单词与连字符符号连接)

### 注册

我们有两种注册方法，全局注册和局部注册：

1. **全局注册** (不是特别常用)
    
    即使用 `app.component` 在根 Vue 元素上创建组件（可见 `main.js`）
    
    ```php
    Vue.createApp({...}).component('my-component-name', {
      // ... 选项 ...
    })
    ```
    
    这些组件是 **全局注册** 的，即它们在注册之后可用在任何新创建的组件实例的模板中。
    
    E.g. 
    
    ```php
    const app = Vue.createApp({})
    
    app.component('component-a', {
      /* ... */
    })
    app.component('component-b', {
      /* ... */
    })
    app.component('component-c', {
      /* ... */
    })
    
    app.mount('#app')
    
    ```
    
    ```html
    <div id="app">
    	<component-a></component-a>
    	<component-b></component-b>
    	<component-c></component-c>
    </div>
    ```
    
2. **局部注册**
    
    全局注册往往是不够理想的。
    
    比如，如果你使用一个像 webpack 这样的构建系统，全局注册所有的组件意味着即便你已经不再使用其中一个组件了，它仍然会被包含在最终的构建结果中,这造成了用户下载的 JS 的无谓的增加.
    
    在这些情况下，你可以通过一个普通的 JavaScript 对象来定义组件 : 
    
    ```jsx
    const ComponentA = {
      /* ... */
    }
    const ComponentB = {
      /* ... */
    }
    const ComponentC = {
      /* ... */
    }
    ```
    
    然后在 `components` 选项中定义你想要使用的组件：
    
    ```php
    const app = Vue.createApp({
      components: {
        'component-a': ComponentA,
        'component-b': ComponentB
      }
    })
    ```
    
    注意 **局部注册的组件在其子组件中不可用**
    
3. **在模块系统中局部注册 （常用）**
    
    ```php
    import ComponentA from './ComponentA'
    import ComponentC from './ComponentC'
    
    export default {
      components: {
        ComponentA,
        ComponentC
      }
      // ...
    }
    ```
    
    现在 ComponentA 和 ComponentC 都可以在 ComponentB 的模板中使用了。
    

## 组件复用

你可以将组件进行任意次数的复用：

```html
<div id="components-demo">
	<button-counter></button-counter>
	<button-counter></button-counter>
	<button-counter></button-counter>
	...
	<button-counter></button-counter>
	<button-counter></button-counter>
	<button-counter></button-counter>
</div>
```

注意每个组件都是一个实例，即他们都有自己的 data property

                                                                                                                                   by KobeNorris