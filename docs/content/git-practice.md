# Git 练习

### 1

创建一个名为exercise201的目录（随便起的）。你可以把这个目录放在电脑的任何地方。

### 2

进入exercise201目录，并在该目录中初始化一个git存储库。

### 3

创建一个名为file1.txt的文件。在这个txt文件中，输入文本“file1 version 1”。

### 4

创建另一个名为file2.txt的文件。在这个txt文件中，添加文本“file2 version 1”。

### 5

开始只跟踪file1.txt，并创建一个只包含该文件的新提交，提交消息:“Add file1.txt”。

### 6

在file1.txt中进行修改，将文件中的文本更改为:" file1 changed to version 2 "。

### 7

再次提交，这次包含file1.txt和file2.txt。提交消息:" Update file1.txt and add file2.txt "。

### 8

最后，通过将文件中的文本更改为“file1 changed to version 3”，对file1.txt进行进一步修改。不要提交这个版本。

此时，如果你输入git status和git log，应该会显示如下类似的信息：

<img src="./images\git-guidance-1.png" alt="1" style="zoom:80%;" />

<img src=".\images\git-guidance-2.png" alt="2" style="zoom:80%;" />

### 9

这个时候你可以尝试使用git checkout将文件恢复到最早提交的版本

<img src=".\images\git-guidance-3.png" alt="3" style="zoom:80%;" />

此时文件回到第一次提交状态。

<img src=".\images\git-guidance-4.png" alt="4" style="zoom:80%;" />
