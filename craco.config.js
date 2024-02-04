/**
 * Craco 重写 CRA 配置
 *  - GitHub：https://github.com/gsoft-inc/craco
 *  - 配置参数：https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md#configuration-overview
 *  - 快速指南：https://blog.eleven.net.cn/2020/09/11/cra/craco/
 *
 * Tips：
 *  1、区分 node 运行环境 —— NODE_ENV
 *    - whenDev ☞ process.env.NODE_ENV === 'development'
 *    - whenTest ☞ process.env.NODE_ENV === 'test'
 *    - whenProd ☞ process.env.NODE_ENV === 'production'
 *  2、NODE_ENV 可以区分 node 运行环境，仅支持 development、test、production，
 *    自定义的 REACT_APP_BUILD_ENV 用于区分编译环境，支持 development、test、uat、production。
 *  3、craco 有提供一些好用的 plugin（https://github.com/gsoft-inc/craco#community-maintained-plugins），推荐优先考虑使用现成的 craco plugin 去解决问题。
 *  4、CRA 脚手架相关的配置覆盖，优先使用 craco 提供的快捷方式去配置。解决不了的问题，在 configure 函数中配置。
 *    推荐 configure 配置使用函数形式，而非对象形式。虽然，函数形式更复杂了一点，但是二者是互斥的，只能选择其中一种。
 */

const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { whenDev, whenProd, when } = require("@craco/craco");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const WebpackBar = require("webpackbar");
const CracoLessPlugin = require("craco-less");
const CracoScopedCssPlugin = require("craco-plugin-scoped-css");
const CracoScopedLessPlugin = require("craco-scoped-less");
const CircularDependencyPlugin = require("circular-dependency-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const vConsolePlugin = require("vconsole-webpack-plugin");
const genericNames = require("generic-names");

// 判断编译环境是否为生产
const isBuildProd = process.env.REACT_APP_BUILD_ENV === "production";
// 判断 node 运行环境是否为 production
const isProd = process.env.NODE_ENV === "production";
const isBuildAnalyzer = process.env.BUILD_ANALYZER === "true";
const sourceMappingURL = process.env.REACT_APP_SOURCE_MAPPING_URL;
const removeFilenameHash = process.env.REMOVE_FILENAME_HASH === "true";
const shouldDropDebugger = process.env.SHOULD_DROP_DEBUGGER === "true";
const shouldDropConsole = process.env.SHOULD_DROP_CONSOLE === "true";
const enableVConsole = process.env.ENABLE_VCONSOLE === "true";
const localIdentName = "[local]-[hash:base64:5]";

module.exports = {
  /**
   * 扩展 babel 配置
   */
  babel: {
    // assumptions: {
    //   /**
    //    * https://babeljs.io/docs/en/assumptions#setpublicclassfields
    //    *
    //    * 装饰器的 legancy: true，依赖此配置
    //    *  - https://babeljs.io/docs/en/babel-plugin-proposal-decorators#legacy
    //    */
    //   setPublicClassFields: true,
    //   privateFieldsAsSymbols: true,
    // },
    presets: [
      [
        "@babel/preset-env",
        {
          modules: false, // 对 ES6 的模块文件不做转化，以便使用 webpack 支持的 tree shaking、sideEffects
          useBuiltIns: "entry", // entry ☞ 按需导入，指定的 browserslist 环境，不支持的特性垫片
          // https://babeljs.io/docs/en/babel-preset-env#usebuiltins
          // https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md
          corejs: {
            version: 3, // 使用 core-js@3
            proposals: true,
          },
          // Exclude transforms that make all code slower
          exclude: ["transform-typeof-symbol"],
        },
      ],
    ],
    plugins: [
      [
        "babel-plugin-import",
        {
          libraryName: "@xmly/mi-design",
          libraryDirectory: "es",
          camel2DashComponentName: false, // 避免 customName 和拼接参数格式化成驼峰
          customName: (name) => {
            return `@xmly/mi-design/dist/components/common/${name}`;
          },
          style: (path) => `${path}/style/index.less`,
        },
        "@xmly/mi-design",
      ],
      /**
       * babel-plugin-react-css-modules
       *  - GitHub: https://github.com/gajus/babel-plugin-react-css-modules
       *  - http://ekoneko.github.io/blog/engineering/stop-using-css-in-js/
       *  - https://zhuanlan.zhihu.com/p/26878157
       */
      [
        "react-css-modules",
        {
          exclude: "node_modules",
          filetypes: {
            ".scss": {
              syntax: "postcss-scss",
            },
            ".less": {
              syntax: "postcss-less",
            },
          },
          // 必须保持和 css-modules 的 localIdentName 一致的命名
          // https://github.com/gajus/babel-plugin-react-css-modules/issues/291
          // generic-names 用于解决 css-loader v4 hash 的兼容
          generateScopedName: genericNames(localIdentName),
          webpackHotModuleReloading: true,
          autoResolveMultipleImports: true,
          handleMissingStyleName: "warn",
        },
      ],
      /**
       * https://github.com/tleunen/babel-plugin-module-resolver
       *
       * 解决 babel-plugin-react-css-modules 不兼容 webpack alias 问题
       *
       * Support for Webpack resolve aliases
       *  https://github.com/gajus/babel-plugin-react-css-modules/issues/46
       */
      // [
      //   'module-resolver',
      //   {
      //     alias: {
      //       '@': path.resolve(__dirname, 'src'),
      //     },
      //   },
      // ],
    ],
  },
  style: {
    /**
     * css modules 配置
     */
    modules: {
      // 必须保持和 babel-plugin-react-css-modules 一致的命名
      localIdentName,
    },
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
  /**
   * 扩展 webpack 相关配置
   */
  webpack: {
    /**
     * 新增 webpack plugin
     */
    plugins: [
      /**
       * https://www.npmjs.com/package/webpackbar
       */
      new WebpackBar(),
      /**
       * 模块间循环依赖检测插件
       *  - https://juejin.im/post/6844904017848434702
       */
      ...whenDev(
        () => [
          new CircularDependencyPlugin({
            exclude: /node_modules/,
            include: /src/,
            failOnError: true,
            allowAsyncCycles: false,
            cwd: process.cwd(),
          }),
        ],
        []
      ),
      /**
       * 编译产物分析
       *  - https://www.npmjs.com/package/webpack-bundle-analyzer
       */
      ...when(isBuildAnalyzer, () => [new BundleAnalyzerPlugin()], []),
      /**
       * 喜马拉雅前端私有 source map，编译生产代码时更换 map 文件链接
       */
      ...when(
        isBuildProd,
        () => [
          new webpack.SourceMapDevToolPlugin({
            publicPath: sourceMappingURL,
            filename: "[file].map",
          }),
        ],
        []
      ),
      /**
       * vconsole-webpack-plugin
       *  - 生产环境，强制不会生效
       *
       * 必须 entry 为数组插件才能生效，如果不是需自己改写
       * https://github.com/diamont1001/vconsole-webpack-plugin/issues/44
       */
      ...when(
        !isBuildProd,
        () => [
          new vConsolePlugin({
            enable: !isBuildProd && enableVConsole,
          }),
        ],
        []
      ),
    ],
    /**
     * 重写 webpack 任意配置
     *  - configure 能够重写 webpack 相关的所有配置，但是，仍然推荐你优先阅读 craco 提供的快捷配置，把解决不了的配置放到 configure 里解决；
     *  - 这里选择配置为函数，与直接定义 configure 对象方式互斥；
     */
    configure: (webpackConfig, { env, paths }) => {
      /**
       * 改写 entry 为数组，确保 vconsole-webpack-plugin 可以生效
       * https://github.com/diamont1001/vconsole-webpack-plugin/issues/44
       */
      if (isProd && typeof webpackConfig.entry === "string") {
        webpackConfig.entry = [webpackConfig.entry];
      }

      /**
       * 修改 output
       */
      webpackConfig.output = {
        ...webpackConfig.output,
        ...when(
          isProd,
          () => ({
            // 命名上移除 chunk 字样
            chunkFilename: "static/js/[name].[contenthash:8].js",
          }),
          {}
        ),
        // 支持移除 js 文件名的 hash 值
        ...when(
          isProd && removeFilenameHash,
          () => ({
            filename: "static/js/[name].js",
            chunkFilename: "static/js/[name].js",
          }),
          {}
        ),
      };

      /**
       * 配合私有 source map 文件，修改 map 文件链接时，需设置为 false
       * （仅编译生产代码时修改 map 文件链接）
       */
      webpackConfig.devtool = isBuildProd ? false : webpackConfig.devtool;

      /**
       * 扩展 extensions
       */
      webpackConfig.resolve.extensions = [
        ...webpackConfig.resolve.extensions,
        ...[".scss", ".less"],
      ];

      webpackConfig.resolve.plugins = [
        ...webpackConfig.resolve.plugins,
        ...[
          /**
           * 自动将 tsconfig 里的 paths 注入到 webpack alias
           * （意味着你不再需要额外增加 webpack alias）
           *  - https://github.com/dividab/tsconfig-paths-webpack-plugin
           */
          new TsconfigPathsPlugin({
            extensions: [".ts", ".tsx", ".js", ".jsx"],
          }),
        ],
      ];

      webpackConfig.optimization.minimizer =
        webpackConfig.optimization.minimizer.map((plugin) => {
          /**
           * TerserPlugin
           */
          if (plugin instanceof TerserPlugin) {
            plugin = new TerserPlugin({
              terserOptions: {
                parse: {
                  ecma: 8,
                },
                compress: {
                  ecma: 5,
                  warnings: false,
                  comparisons: false,
                  inline: 2,
                  drop_console: shouldDropConsole,
                },
                mangle: {
                  safari10: true,
                },
                keep_classnames: false,
                keep_fnames: false,
                output: {
                  ecma: 5,
                  comments: false,
                  ascii_only: true,
                },
              },
            });
          }

          return plugin;
        });

      /**
       * webpack split chunks
       */
      // webpackConfig.optimization.splitChunks = {
      //   ...webpackConfig.optimization.splitChunks,
      // };

      /**
       * 覆盖已经内置的 webpack plugins
       */
      webpackConfig.plugins.map((plugin) => {
        /**
         * 支持移除 css 文件名的 hash 值
         */
        whenProd(() => {
          if (plugin instanceof MiniCssExtractPlugin) {
            Object.assign(
              plugin.options,
              {
                // 命名上移除 chunk 字样
                chunkFilename: "static/css/[name].[contenthash:8].css",
              },
              when(
                removeFilenameHash,
                () => ({
                  filename: "static/css/[name].css",
                  chunkFilename: "static/css/[name].css",
                }),
                {}
              )
            );
          }
        });

        return plugin;
      });

      // 返回重写后的新配置
      return webpackConfig;
    },
  },
  /**
   * 新增 craco 提供的 plugin
   */
  plugins: [
    /**
     * 支持 less
     *  - https://github.com/DocSpring/craco-less
     *  - options 参数：https://github.com/DocSpring/craco-less#configuration
     */
    {
      plugin: CracoLessPlugin,
      options: {
        modifyLessRule(lessRule, context) {
          return {
            ...lessRule,
            ...{
              test: /\.less$/,
              exclude: /\.module\.less$/,
            },
          };
        },
      },
    },
    /**
     * 支持 less module
     *  - https://github.com/DocSpring/craco-less#configuration
     */
    {
      plugin: CracoLessPlugin,
      options: {
        modifyLessRule(lessRule, context) {
          return {
            ...lessRule,
            ...{
              test: /\.module\.less$/,
              exclude: undefined,
            },
          };
        },
        cssLoaderOptions: {
          modules: {
            // 必须保持和 babel-plugin-react-css-modules 一致的命名
            localIdentName,
          },
        },
      },
    },
    /**
     * react scoped css (only scss/css)
     *  - https://github.com/gaoxiaoliangz/react-scoped-css
     */
    {
      plugin: CracoScopedCssPlugin,
    },
    /**
     * react scoped css, support less
     *  - https://github.com/villaincoder/craco-scoped-less
     */
    {
      plugin: CracoScopedLessPlugin,
    },
  ],
  devServer: {},
};
