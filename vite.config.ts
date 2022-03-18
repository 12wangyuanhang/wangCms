import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), vueJsx()],
    resolve:{
        extensions:['.mjs','.js','.ts','.jsx','.tsx','.json'],
        alias: {
            "@": resolve(__dirname, 'src'),
        },
    },
    publicDir: 'public',
    base: './',
    server:{
        open:true,
    },
    // server: {
    //     host: "0.0.0.0",
    //     https: false, //是否启用 http 2
    //     cors: true, //为开发服务器配置 CORS , 默认启用并允许任何源
    //     open: true, //服务启动时自动在浏览器中打开应用
    //     port: 9000,
    //     strictPort: false, //设为true时端口被占用则直接退出，不会尝试下一个可用端口
    //     force: true, //是否强制依赖预构建
    //     hmr: false, //禁用或配置 HMR 连接
    //     // 传递给 chockidar 的文件系统监视器选项
    //     // watch: {
    //     //     ignored: ["!**/node_modules/your-package-name/**"]
    //     // },
    //     // 反向代理配置
    //     // proxy: {
    //     //     '/api': {
    //     //         target: "https://xxxx.com/",
    //     //         changeOrigin: true,
    //     //         rewrite: (path) => path.replace(/^\/api/, '')
    //     //     }
    //     // }
    // },
    // //打包配置
    // build: {
    //     //浏览器兼容性  "esnext"|"modules"
    //     target: "modules",
    //     //指定输出路径
    //     outDir: "dist",
    //     //生成静态资源的存放路径
    //     assetsDir: "assets",
    //     //小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
    //     assetsInlineLimit: 4096,
    //     //启用/禁用 CSS 代码拆分
    //     cssCodeSplit: true,
    //     //构建后是否生成 source map 文件
    //     sourcemap: false,
    //     //自定义底层的 Rollup 打包配置
    //     rollupOptions: {},
    //     //@rollup/plugin-commonjs 插件的选项
    //     commonjsOptions: {},
    //     //当设置为 true，构建后将会生成 manifest.json 文件
    //     manifest: false,
    //     // 设置为 false 可以禁用最小化混淆，
    //     // 或是用来指定使用哪种混淆器
    //     // boolean | 'terser' | 'esbuild'
    //     minify: "terser", //terser 构建后文件体积更小
    //     //传递给 Terser 的更多 minify 选项。
    //     terserOptions: {},
    //     //设置为 false 来禁用将构建后的文件写入磁盘
    //     write: true,
    //     //默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。
    //     emptyOutDir: true,
    //     //启用/禁用 brotli 压缩大小报告
    //     brotliSize: true,
    //     //chunk 大小警告的限制
    //     chunkSizeWarningLimit: 500
    // },
})