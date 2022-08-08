import { defineConfig } from 'dumi';

export default defineConfig({
  // base: '/notebook',
  // publicPath: '/notebook/',
  title: 'JavaScript',
  favicon: 'https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/javascript.svg',
  logo: 'https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/javascript.svg',
  outputPath: 'docs-dist',
  mode: 'site',
  styles: [
    'https://cdn.bootcdn.net/ajax/libs/tailwindcss/2.2.19/utilities.min.css',
  ],
  resolve: {
    includes: ['docs', 'packages'],
  },
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
      'antd',
    ],
  ],
  // extraPostCSSPlugins: [require('tailwindcss'), require('autoprefixer')],
  // more config: https://d.umijs.org/config
});
