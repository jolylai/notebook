import { defineConfig } from 'dumi';

export default defineConfig({
  base: '/notebook-javascript',
  publicPath: '/notebook-javascript/',
  title: 'JavaScript',
  favicon: 'https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/javascript.svg',
  logo: 'https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/javascript.svg',
  outputPath: 'docs-dist',
  mode: 'site',
  resolve: {
    includes: ['docs'],
  },
  styles: [
    // 'https://cdn.bootcdn.net/ajax/libs/tailwindcss/2.0.0-alpha.5/tailwind.min.css',
    // 'svg, img {display: inline-block}; ol {list-style: decimal}; ul {list-style: disc;}',
  ],
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      },
    ],
  ],
  // more config: https://d.umijs.org/config
});
