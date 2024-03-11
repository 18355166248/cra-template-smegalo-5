# continuous-subscribe-checkstand

使用框架

- [create-react-app@5](https://github.com/facebook/create-react-app)
- [@craco/craco@7](https://github.com/dilanx/craco)
- [tailwindcss@3](https://tailwindcss.com/docs/installation/using-postcss)
- [webpack@5](https://github.com/webpack/webpack)
- [react@18.2](https://github.com/facebook/react)
- [react-router-dom@6.10](https://github.com/remix-run/react-router)

## 配置

### 如何修改端口

在 .env 文件中 直接修改 PORT 的值即可

### 如何修改环境变量

在 .env-cmdrc.js 文件中对应的环境下声明环境变量 重启项目即可使用

### 本地启动项目, 联调接口如何解决跨域问题

在 src/setupProxy.js 下, 做代理配置即可, 针对 proxy 配置不太熟的同学, 可以查看[文档](https://webpack.docschina.org/configuration/dev-server/#devserverproxy)

### 如何声明本地字典

在 src/constants 下新建文件, 初始化字典即可, 文件夹中有 demo 示例

### 如何声明新的路由

在 src/pages 文件夹下新建文件夹, 初始化路由组件
