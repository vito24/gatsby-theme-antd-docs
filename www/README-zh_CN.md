<h1 align="center">gatsby-theme-antd-docs</h1>

<div align="center">

一款 [Gatsby](https://www.gatsbyjs.org/) 主题，方便快速搭建像 [Ant Design](https://ant.design) 这样的文档网站。

</div>

[English](./README.md) | 简体中文

## 为什么创建这个项目

[Ant Design](https://ant.design) 拥有一套非常优秀的React组件库，同时，它的网站也十分简洁美观，非常适合用来作为组件库的文档网站。于是，参考 [Ant Design](https://ant.design) 和 [Ant Design Pro](https://pro.ant.design) 的代码，建立了gatsby-theme-antd-theme。

感谢 [Ant Design](https://ant.design) 团队给我们带来的这么优秀的开源作品！

## 特性

- 基于Ant Design的UI设计风格。
- 只需编写markdown文件，自动生成页面。
- 在线预览markdown中的jsx。

## 安装

```bash
yarn add gatsby-theme-antd-docs
```

添加到你的 `gatsby-config.js`

```js
module.exports = {
  plugins: ['gatsby-theme-antd-docs']
}
```

## 本地浏览example

```bash
yarn install
yarn workspace example start
```

打开浏览器访问 http://127.0.0.1:8000

## 🔗 参考链接

- [Gatsby](https://www.gatsbyjs.org/)
- [Ant Design](http://ant.design/)
- [Ant Design Pro](http://pro.ant.design/)
