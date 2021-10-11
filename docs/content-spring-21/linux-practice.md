# 云服务和 `Linux` 操作练习

在练习开始之前，请先确保你有一个可用的云服务。如果没有，请阅读[云服务](../content/cloud-service)，选择一个云服务购买和使用。  
<br>

不想花钱的话，`AWS` 对学生有六个月免费，腾讯云的三个月 27 元套餐我们可以报销。  
<br>

请活用搜索引擎，完成以下操作：  
<br>

## 基础
- 使用 `ssh` 登录自己的云服务器
- 用 `cd` 命令更换目录
- 用 `ls` 命令列出目录的内容
- 用 `touch` 命令创建文件
- 用 `mkdir` 命令创建文件夹
- 用 `cp` 命令复制文件
- 用 `mv` 命令移动文件
- 用 `cat` 打印出文件的内容
- 用 `top` 或 `htop` 查看系统状态

## 安装相关
1. 请检查服务器是否安装了 `python`，如果没有，请使用 `apt` 安装 `python3`
2. 使用 `apt` 安装 `nginx`
3. 搜索 `nginx` 的用法，使用 `sudo service nginx <命令>` 来控制 `nginx` 服务的开关。当 `nginx` 服务开启后，用自己的电脑打开浏览器，输入服务器的 `ip` 地址，应该能看到 `Welcome to nginx` 的页面。


## Vim 相关
- 使用 `vim <filename>` 打开文件，进行编辑。关于 `vim` 的操作，请阅读[教程](https://www.runoob.com/linux/linux-vim.html)。


## `nginx` 配置相关
- 请前往 `/etc/nginx/sites-enabled/`，观察并修改其中的配置文件，在 `10080` 端口发布自己的俄罗斯方块（或其它）`html` 文件。修改完毕后，使用 `sudo service nginx restart` 重启 `nginx` 服务。
