[![GitHub forks](https://img.shields.io/github/forks/jo0ger/jooger.me-server.svg?style=flat-square)](https://github.com/jo0ger/jooger.me-server/network)
[![GitHub stars](https://img.shields.io/github/stars/jo0ger/jooger.me-server.svg?style=flat-square)](https://github.com/jo0ger/jooger.me-server/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/jo0ger/jooger.me-server.svg?style=flat-square)](https://github.com/jo0ger/jooger.me-server/issues)
[![GitHub last commit](https://img.shields.io/github/last-commit/jo0ger/jooger.me-server.svg?style=flat-square)](https://github.com/jo0ger/jooger.me-server/commits/master)

## jooger.me-server

⚡️ My blog's api server build with koa2 and mongoose，a RESTful application.

## Online site

* jooger.me: [https://jooger.me](https://jooger.me)

* jooger.me-server: [https://api.jooger.me](https://api.jooger.me)

* jooger.me-admin: [https://admin.jooger.me](https://admin.jooger.me)

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve at localhost:3001 in development env
$ npm run dev

# serve at localhost:3001 in production env
$ npm run prod

# serve with pm2 in development env
$ npm run pm2

# serve with pm2 in production env
$npm run pm2:prod

# run pm2 deploy, need ecosystem.config.js at root path
$ npm run deploy

# test code (TODO)
$ npm run test
```

## Directory tree

```
jooger.me-server
|____api.md                             // api文档（待完善）
|____bin                                // 启动目录
|____ecosystem.config.js                // pm2启动文件，需要自己手动创建
|____LICENSE                            // LICENSE(MIT)
|____logs                               // 日志目录，在ecosystem.config.js中配置
|____server                             // 程序主目录
| |____app.js                           // App程序入口
| |____config                           // 配置文件目录
| | |____development.js                 // 开发环境配置
| | |____production.js                  // 生产环境配置
| | |____test.js                        // 测试环境配置
| |____controller                       // Controllers
| |____middleware                       // Koa中间件
| |____model                            // 数据持久化模型
| |____plugins                          // 插件目录
| | |____akismet.js                     // 评论反垃圾
| | |____mailer.js                      // 邮件客户端
| | |____mongo.js                       // MongoDB驱动（mongoose）
| | |____redis.js                       // Redis
| | |____validation.js                  // 额外的校验规则
| |____routes                           // 路由目录
| | |____backend.js                     // 后台路由
| | |____frontend.js                    // 前台路由
| |____service                          // 服务目录
| | |____crontab.js                     // 定时更新任务
| | |____github-passport.js             // Github验证
| | |____github-userinfo.js             // 获取Github用户信息
| | |____netease-music.js               // 网易云音乐api
| |____util                             // 常用工具
|____test                               // 测试目录

```

## TODOS

* ~~音乐api~~ (2017.9.26)

* ~~Github oauth 代理~~ (2017.9.28)

* ~~文章分类api~~ (2017.10.26)

* ~~Redis缓存部分数据~~ (2017.10.27 v1.1)

* ~~评论api~~ (2017.10.28)

* ~~评论定位 [geoip](https://github.com/bluesmoon/node-geoip)~~ (2017.10.29)

* ~~垃圾评论过滤 [akismet](https://github.com/chrisfosterelli/akismet-api)~~ (2017.10.29)

* ~~用户禁言~~ (2017.10.29)

* ~~评论发送邮件 [nodemailer](https://github.com/nodemailer/nodemailer)~~ (2017.10.29)

* ~~GC优化~~ (2017.10.30，linux下需要预先安装g++)

* ~~个人动态api~~ (2017.10.30)

* 邮件模板

* 消息api

* 日志api

* 统计api

* 完善API文档
