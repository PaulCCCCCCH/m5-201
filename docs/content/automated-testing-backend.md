# 后端自动化测试

后端自动化测试的逻辑与[前端自动化测试](../automated-testing)很像：都是引入一些工具，对于每一个功能模块，用代码模拟真实的运行场景，然后通过脚本一键运行所有测试。  
<br>

## 引入工具

首先，在 `pom.xml` 中间声明这个依赖包（如果创建项目时使用的是 `Spring Initializer`，这个应该默认是有的）。  
<br>

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```

这个依赖其实是很多工具的打包版本，其中包含各位熟悉的 `JUnit`。  
<br>

## 模拟完整请求

在这里，我们测试完整的后端逻辑：接收请求 -> 调用 `Controller` -> 调用 `Service` -> 调用 `Mapper` -> 查询数据库 -> 返回。为了这样测试，我们只需要模拟真实场景，给自己发送请求就行了。  
<br>

我们需要新建一个测试类，并为它打上标签，像下面这样  

```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ProductTest {
	//...
}
```

`@SpringBootTest` 会告诉 `SpringBoot` 这是一个测试用的类，这样可以在一键运行的时候找到。  
<br>

而括号里的 `webEnvironment` 部分，可以理解为让 `SpringBoot` 跑一个模拟的服务：手动测试的时候，是要先让服务跑起来，然后发请求；这样写之后，你不需要运行这个项目，只需要运行这个测试文件就可以了。`RANDOM_PORT` 意思是随便指定一个端口运行这个模拟的服务。  
<br>

之后，我们使用 `RestTemplate` 这个东西（一个发送 `HTTP` 请求的工具），向自己的接口发送请求，然后用常规的 `JUnit` 语句测试返回值是否符合预期。  
<br>


举个例子，假定我们的接口是这样：

```java
@PostMapping("/product")
public CommonResult<Product> addProduct(@RequestBody Product product) {
 	// 插入一个 product 到数据库里
}
```

为了测试这个接口，我们的测试类可以这样写：

```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ProductTest {
    
    @Resource
    TestRestTemplate restTemplate; // 用来向模拟服务发送 HTTP 请求
    
    @Resource
    ObjectMapper mapper;	// 用来把 JSON String 转成 Java Object
    
    @Test
    void testPostProduct() throws Exception {
        // 创建一个 Product
        Product product = new Product();
        product.setId(BigInteger.valueOf(777));
        product.setName("AirPods");
        // ... 以及 set 一堆东西...
        
        // 发送 POST 请求，然后以 String 形式从模拟的服务拿回一个 response
        // 注意：这里的 String.class 告诉 restTemplate，返回值是 String
        // 但是，无法直接告诉它，返回值是 `CommonResult<Product>`，因为牵扯到 generic type
        String response = restTemplate.postForObject("/product", product, String.class);
        
        // 把 response 从 String 弄成一个有结构的 class
        CommonResult<Product> result = this.mapper.readValue(
            response,
            new TypeReference<CommonResult<Product>>() {} 
        	// 这个 TypeReference 用来告诉 mapper，要把 JSON 转成啥类型
        	// TypeReference 是一个 AbstractClass，所以初始化它的时候后面要加一个 {}
        );
        
        // 用正常的 JUnit 的功能去测试即可
        Assertions.assertEquals("AirPods", result.getData().getName());
        
    }
}
```



这里对 `/product` 发送了一个 `POST` 请求，模拟了插入一个 `Product` 的请求。  

我们也可以用`RestTemplate` 下的 `put `，`delete`，`exchange`、`getForObject` 等方法，发送不同请求。具体的使用方法可以查阅这个 [Guide](https://www.baeldung.com/rest-template) 或 `RestTemplate` 的 [官方文档](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/client/RestTemplate.html)。  



## 模拟单个组件

我们可以把 `Mapper`，`Service` 或 `Controller` 单独拿来测试。我们会用到 `MockMvc` 这个工具（其实是 `mockito` 这个工具的延申）。它的[官方教程](https://spring.io/guides/gs/testing-web/)在这里。  
<br>

比如，我们现在只测试 `Controller`，而不去管 `Service` 层有没有在正确地干活，我们需要先 `Mock`一个 `Service` 层，假定它是好的，在这基础上，测试 `controller` 的功能。 举个例子：  
<br>


```java
@SpringBootTest
@AutoConfigureMockMvc
public class ProductTest2 {
    
    @MockBean
    private ProductService productService; // 这是我们 mock 的 service

    @Resource
    private MockMvc mockMvc; // 这是我们要用的工具

    @Test
    public void testProductController() throws Exception {
        
        // 创建一个 product
        Product p = new Product();
        p.setId(BigInteger.valueOf(777));
        p.setName("Apple");
        // 指定怎么个 mock 法
        // 意思是：别管 productService 到底是怎么实现的（没写都没关系）
        // 假定：只要我给了任何 argument，它都会 return 一个 p (之前定义的 product)
        given(this.productService.getProductById(ArgumentMatchers.any())).willReturn(p);

        // 然后，去向 controller 发请求，然后 expect 一堆结果（就像 assert 那样）
        // jsonPath 里面的东西是用来获取 json 的 attribute 的
        mockMvc.perform(get("/product/777"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(200))
                .andExpect(jsonPath("$.message").value("操作成功"))
                .andExpect(jsonPath("$.data.id").value(777))
                .andExpect(jsonPath("$.data.name").value("Apple"))
                .andReturn();
    }
}

```


如果想要测试 `Service` 和 `Mapper`，其实逻辑非常像，而且由于不牵扯到发送请求，所以更加简单。  

以测试 Service 的代码为例：  

```java
@SpringBootTest
@AutoConfigureMockMvc
public class ProductServiceTest {
   	@MockBean
    private ProductMapper productMapper;
    @Autowired
    private ProductService productService;
    @Test
    public void testProductService(){
        Product p = new Product();
        p.setxxx() //... 设置 p 的属性
        
        // 假定 Mapper 是 ok 的，不管查询什么 id，都会返回 p
        given(productMapper.findById(any())).willReturn(p);
        
        // 在 Mapper ok 的情况下，使用 productService
        Product resultProduct = productService.findById(100);
        
        // 然后在这里使用 assert 语句判断 resultProduct 是否符合要求。
        // 如果没有问题，说明 Service 这层没问题。
    }
}

```
  
测试 `Mapper` 的话，就不需要使用 `mock` 去假定什么东西了。  
