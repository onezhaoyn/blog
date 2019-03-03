# 酷核 Kuhe.io

> 本项目是个人技术博客项目，分为前端页面展示部分、前端admin文章管理部分和 后端服务部分。

> [上线地址](https://kuhe.io)

关键字：博客项目，前后端分离，服务端渲染，响应式布局

##  技术栈：

Vue / Vue Router / Nuxt，Koa2，MongoDB(Mongoose)，ElementUI，Less，JWT

## 项目由来

希望把Vue相关的知识沉淀一下，能想到的最好的方式还是通过项目实操，来锻炼自己的技术能力。

博客是一个技术人员的必备，写博客不仅梳理了你的知识结构，同时也加深了和知识之间的链接，这样日积月累会让自己的知识结构更加牢固，所以最终还是决定做一个个人博客系统。该项目从构想、设计到数据库设计、REST API设计以及前后端的实现，均为本人独立完成。

##  技术栈选择

- 服务端渲染：必须要支持服务端渲染，一开始准备自己搞vue服务端渲染。
- 响应式布局：一开始准备用BootStrap但是在Vue上其实和原生BootStrap的语法完全不同了，果断放弃，最后是自己写的media query实现的响应式布局。
- Element UI：选了一个相对主流的视图组件，虽然可选择的组件偏少，但是还是够用了，组件样式都挺好看的。
- 没有使用Vuex--对Vuex还不太熟，在后来的社区项目中用到了，争取重构的时候补上。

## 项目特点：

1）前端博客页面部分：

- 基于Nuxt构建，支持服务端渲染，使用Element UI、Less，使用Axios进行前后端通讯；
- 独立封装了仿简书的评论组件，使用Web Storage存储用户信息，发布评论不用重复填写用户信息；
- 评论区头像会根据用户邮箱地址获取Gravatar，如用户未设置Gravatar，则会拉取adorable API的随机头像并显示；
- 支持文章点赞和取消点赞，支持按标签检索，支持关键字全文搜索。
- 进行了初步的SEO优化；支持https

2）前端管理员系统：

- 基于Vue-cli+Vue-Router，独立封装了仿微信公众号的文章封面上传、剪裁组件，支持图片1:1和2.35:1的剪裁。

3）后端：

- 使用Koa+MongoDB，Koa错误集中化处理；
- 使用Mongoose进行数据检索、筛选和排序；
- 使用JWT+Session+Cookie进行用户登陆权鉴；
- 支持将上传图片重命名并存储在本地；
- 对用户提交的评论信息使用sanitize-html对评论区留言进行过滤，防止XSS攻击。

4）部署使用CentOS + NginX + PM2；

## 动图展示

### 响应式布局
![Imgur](https://i.imgur.com/GR7dfed.gif)


### 博客管理员后台发表文章时，上传封面图片并剪裁
![Imgur2](https://i.imgur.com/NloO5ut.gif)
