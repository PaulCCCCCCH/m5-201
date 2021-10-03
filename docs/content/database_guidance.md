# 数据库_引入

## 数据库是什么

数据库，顾名思义，是一个储存数据的仓库。

相较于excel等软件，它的存储空间很大，可以存放百万条、千万条、上亿条数据。

存储的内容多种多样，比如出行记录、消费记录、浏览的网页、发送的消息等等。除了文本类型的数据，图像、音乐、声音都是数据。

## 数据库管理系统

数据库管理系统相当于数据库这个仓库中的管理人员、安保人员。

是为管理数据库而设计的电脑软件系统，一般具有存储、截取、安全保障、备份等基础功能。

常用的数据库管理系统有Mysql，XQuery。

## MySQL

他是一种关系型数据库管理系统，关系数据库将数据保存在不同的表中，而不是将所有数据放在一个大仓库内，这样就增加了速度并提高了灵活性。

## SQL

SQL（结构化查询语言，Structured Query Language）。

常见的操作有增（INSERT）、删（DELETE）、改（UPDATE）、查（SELECT）等。

### 查询语句：

```jsx
SELECT param FROM table WHERE condition 
```

该语句可以理解为从 table 中查询出满足 condition 条件的字段 param。

### 新增语句：

```jsx
INSERT INTO table （param1，param2，param3） VALUES （value1，value2，value3） 
```

该语句可以理解为向table中的param1，param2，param3字段中分别插入value1，value2，value3。

### 更新语句：

```jsx
UPDATE table SET param=new_value WHERE condition 
```

该语句可以理解为将满足condition条件的字段param更新为 new_value 值。

### 删除语句：

```jsx
DELETE FROM table WHERE condition 
```

该语句可以理解为将满足condition条件的数据全部删除。

### 排序查询：

```jsx
SELECT param FROM table WHERE condition ORDER BY param1
```

该语句可以理解为从表table 中查询出满足condition条件的param，并且要按照param1升序的顺序进行排序。