import { defineConfig } from 'dumi';

export default defineConfig({
  base: '/notebook-javascript',
  publicPath: '/notebook-javascript/',
  title: 'JavaScript',
  favicon: 'https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/javascript.svg',
  logo: 'https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/javascript.svg',
  outputPath: 'docs-dist',
  mode: 'site',
  styles: [
    // 'https://cdn.bootcdn.net/ajax/libs/tailwindcss/2.0.0-alpha.5/base.min.css',
    'https://cdn.bootcdn.net/ajax/libs/tailwindcss/2.0.0-alpha.5/tailwind.min.css',
    // 'https://cdn.bootcdn.net/ajax/libs/tailwindcss/2.0.0-alpha.5/utilities.min.css',
    'svg, img {display: inline-block}; ol, ul {list-style: initial;}',
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
