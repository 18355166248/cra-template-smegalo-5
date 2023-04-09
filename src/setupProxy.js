const { createProxyMiddleware } = require("http-proxy-middleware");

// https://create-react-app.dev/docs/proxying-api-requests-in-development/#configuring-the-proxy-manually
module.exports = function (app) {
  app.use(
    createProxyMiddleware(["/test"], {
      target: "http://m.test.ximalaya.com",
      secure: true,
      changeOrigin: true,
      cookieDomainRewrite: "m.test.ximalaya.com",
      pathRewrite: {
        // 以自由添加的前缀作为本地接口代理的标记，请求发送时会被替换掉
        "^/test": "",
      },
    })
  );
};
