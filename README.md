# saas-door

## 启动

```shell
yarn install && yarn serve
```

## 说明

本项目用于快速搭建一个功能较为完善的SaaS平台，服务端代码暂未开源，后续基本完善后会考虑开源

## 计划功能

todo

## 已有功能

todo

## 项目文件结构

* patches: patch-package 覆写源码包补丁文件
* public: index.html
* src：
    * api：后端接口调用
    * assets: 静态资源文件
    * components: 复用组件
    * constants：项目常量文件
    * options: 配置文件
    * pages：路由直接定位页面
    * router： 路由
    * styles: 复用样式文件
    * utils：工具类
    * views: 路由间接定位页面

## 包引用

* fontsource/roboto-slab：字体
* quasar/extras：quasar附加功能
* animate.css：动画
* axios：接口调用
* core-js：base
* highlight.js：markdown解析代码高亮
* marked-highlight: markdown解析代码高亮
* marked：markdown解析
* mitt：事件总线
* patch-package：源码补丁
* qs：接口调用序列化
* quasar：ui美化
* vue：vue
* vue-router：vue
