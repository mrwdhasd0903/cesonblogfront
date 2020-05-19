## 0\了解整个网站架构

![15898780231.jpg](http://47.113.92.137:8888/upload/io/img/2020/5/19/1589878118528.jpg)

如图所示,需要部署2个Vue项目(前台+后台)以及2个后端项目(业务+文件库),其中文件库为war包部署,需要外置tomcat

## 1\环境准备

以下为本人环境版本,仅供参考

1. vue/cli 4.1.2
2. webpack 3.6.0
3. node v11.15.0
4. maven-3.5.2
5. jdk1.8.0
6. tomcat-9.0.24
7. MySql 5.5.62

## 2\项目准备

需要克隆4个项目,分别为

- 前台页面： https://github.com/mrwdhasd0903/cesonblogfront
- 后台页面： https://github.com/mrwdhasd0903/cesonblogadmin
- 后端业务接口： https://github.com/mrwdhasd0903/cesonblog
- 文件存储接口： https://github.com/mrwdhasd0903/upload

使用浏览器或者命令" `git clone`+上面的地址 "将源码克隆到本地

![15898791131.jpg](http://47.113.92.137:8888/upload/io/img/2020/5/19/1589879123679.jpg)

## 3\端口约定

为了项目安全,所有的接口均做了端口跨域限制处理,以下为该部署教程的端口约定,如有占用,请提前清理

- 前台页面访问端口：8080
- 后台页面访问端口：8081
- 后端业务请求端口：8088
- 文件存储请求端口(即外置tomcat端口)：8888
- MySql端口：3306

## 4\数据库准备

建库建表脚本存放在`cesonblog`项目目录下的`blog.sql`

使用图形化工具或者登入命令行执行" `source` +脚本路径 "(已含建库语句)，导入数据

其中t_user表中以含有一条管理员账号`admin`，密码`123456`，用于登入后台页面

## 5\前端部署

### 5.1\前台页面

1. 命令行进入`cesonblogfront`项目目录
2. 执行`npm install`安装工程依赖
3. 执行`npm run serve`运行环境
4. 浏览器进入http://localhost:8080/有页面的加载动画即可

### 5.2\后台页面

1. 命令行进入`cesonblogadmin`项目目录
2. 执行`npm install`安装工程依赖
3. 执行`npm run serve`运行环境
4. 浏览器进入http://localhost:8081/出现登录页面即可

## 6\后端部署

### 6.1\业务接口部署

1. 命令行进入`cesonblog`项目目录
2. 执行`mvn spring-boot:run`运行环境(若运行失败请检查maven环境变量或者导入IDEA)
3. 确认运行成功后,回到浏览器测试后台页面是否能登录系统,账号`admin`,密码`123456`

### 6.2\文件存储接口部署

1. 命令行进入`upload`项目目录
2. 执行`mvn package`生成war包(在target目录下),
3. 将生成的war包重命名为`upload.war`
4. 将`upload.war`复制到`tomcat`的`webapps`目录下
5. 确保`tomcat`端口号为8888,启动`tomcat`
6. 测试：在后台文章发布页面的编辑器中选择上传图片功能，能正常返回图片链接即可

![15898831071.jpg](http://47.113.92.137:8888/upload/io/img/2020/5/19/1589883240494.jpg)

> 至此，整个网站基本部署完成，如果对你有帮助请在GitHub上star这些项目<a href="https://github.com/mrwdhasd0903">小王的github</a>
>
> 另外，关于一些配置我会继续在本文更新，请继续关注<a href="http://www.wdhhh.cn/blog/247">本篇博客</a>