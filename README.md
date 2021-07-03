# 项目说明





- springboot+微信小程序+mysql。
- 有调用有道单词的单词发音API
- 该小程序只是为解决单人听写时的问题，不涉及线上听写功能



该项目主要围绕听写计划来进行听写

1. 创建听写计划，并命名
2. 从单词词库中选择单词添加至计划中
3. 选择听写计划进行听写
4. 听写后选择听写单词加入单词本



目前数据库中只有中学、cet4、cet6单词，有分类信息



# 项目部署

## 微信小程序端：

在app.js中配置后端的ip:port



在me.js的wx.login中配置你的APPID和SECRET

```javascript
url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + 'APPID' + '&secret=' + 'SECRET' + '&js_code=' + res.code + '&grant_type=authorization_code',
```



## springboot端

在数据库中创建selfdictation数据库



运行sql/selfdictation.sql文件，里面有所需表的结构以及单词数据



在application-mybatis.yml中修改mysql的端口及账号密码

```yaml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/selfdictation?serverTimezone=UTC&useUnicode=true&characterEncoding=utf-8
    username: root
    password: 123456
```





