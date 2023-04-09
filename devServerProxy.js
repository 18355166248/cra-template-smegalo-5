export const proxy = {
  "/pay-boss-admin-web": {
    target: "http://ops.test.ximalaya.com/pay-boss-admin-web",
    changeOrigin: true,
    pathRewrite: {
      "^/pay-boss-admin-web": "/",
    },
  },
};
