---
title: Rollup
---

## 前言

```shell
yarn add rollup -D
yarn add rollup-plugin-peer-deps-external -D
yarn add rollup-plugin-scss -D
yarn add rollup-plugin-terser -D
yarn add rollup-plugin-vue -D
yarn add @rollup/plugin-node-resolve -D
yarn add @rollup/plugin-commonjs -D
yarn add @rollup/plugin-json -D
yarn add @rollup/plugin-replace -D
yarn add @rollup/plugin-babel -D
```

**Rollup Plugin Peer Deps External**

Automatically externalize peerDependencies in a rollup bundle.

[rollup-plugin-terser](https://github.com/TrySound/rollup-plugin-terser)
代码压缩插件

## 初始化

```bash
yarn add rollup -D
```

创建 `rollup.config.js`

```js
import { name } from './package.json';

export default {
  input: './packages/index.ts',
  output: [{ format: 'es', file: `dist/${name}.esm.js` }],
};
```

修改 `pckgage.json` 的 `script` 执行命令

```json
{
  "main": "dist/cjs.js",
  "module": "dist/esm-bundler.js",
  "unpkg": "dist/global.js",
  "scripts": {
    "start": "rollup -cw",
    "build": "rollup -c"
  }
}
```

## typescript

```shell
yarn add typescript rollup-plugin-typescript2 -D
```

更改 `rollup.config.js` 配置：

```js
import typescript from 'rollup-plugin-typescript2';

export default {
  input: './src/main.ts',
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true,
    }),
  ],
};
```

这里配置 useTsconfigDeclarationDir 表示使用根目录的 tsconfig.json 文件作为 typescript 编译配置文件。

创建并配置 tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "es2015",
    "lib": ["es2015", "es2016", "es2017", "dom"],
    "strict": true,
    "sourceMap": true,
    "declaration": true,
    "declarationDir": "dist/types",
    "typeRoots": ["node_modules/@types"]
  }
}
```

## 代码压缩

```shell
yarn add rollup-plugin-terser
```

修改 `pckgage.json`

```js
import { terser } from 'rollup-plugin-terser';

export default {
  plugins: [terser()],
};
```

## 转换 CommonJS

```shell
yarn add rollup-plugin-commonjs -D
```

修改 rollup 配置文件

```js
// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  external: [],
  plugins: [resolve(), commonjs()],
};
```

## babel

```shell
yarn add @rollup/plugin-babel @babel/core -D
```

修改 rollup 配置文件

```js
// rollup.config.js

import babel from '@rollup/plugin-babel';

export default {
  plugins: [
    babel({
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.vue'],
      babelHelpers: 'bundled',
    }),
  ],
};
```

**babelHelpers**
配置 helpers 以何种方式插入到代码中 'bundled' | 'runtime' | 'inline' | 'external'

## vue

```
yarn add @vue/compiler-sfc rollup-plugin-vue
```

修改 rollup 配置文件

```js
// rollup.config.js
import vuePlugin from 'rollup-plugin-vue';

export default {
  plugins: [
    vuePlugin({
      css: true,
    }),
  ],
};
```

## 配置文件

在项目中创建一个名为 `rollup.config.js` 的文件，增加如下代码：

```js
const createBaseConfig = () => {
  return {
    input: 'src/index.js',
    external: ['vue'],
    plugins: [peerDepsExternal(), babel(), commonjs(), json()],
    output: {
      sourcemap: false,
      banner: createBanner(),
      externalLiveBindings: false,
      globals: {
        vue: 'Vue',
      },
    },
  };
};
```

```js
// rollup.config.js
export default {
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs',
  },
};
```

如果需要打包多种格式的文件

```js
// rollup.config.js
export default [
  {
    input: 'src/main.js',
    output: {
      file: 'bundle.js',
      format: 'cjs',
    },
  },
  {
    input: 'src/main.js',
    output: {
      file: 'bundle.js',
      format: 'cjs',
    },
  },
];
```

生成包的格式

```js
// rollup.config.js
export default {
  ...,
  output: {
    file: 'bundle.js',
    format: 'iife',
    name: 'MyBundle'
  }
};
```

- `file`: 要写入的文件。也可用于生成 sourcemaps，如果适用
- `name`: 代表你的 `iife/umd` 包，同一页上的其他脚本可以访问它。
- `format`: 生成包的格式。 下列之一:
  - `cjs` – CommonJS，适用于 Node 和 Browserify/Webpack
  - `esm` – 将软件包保存为 ES 模块文件，在现代浏览器中可以通过 `<script type=module>` 标签引入
  - `umd` – 通用模块定义，以 amd，cjs 和 iife 为一体
  - `amd` – 异步模块定义，用于像 RequireJS 这样的模块加载器
  - `iife` – 一个自动执行的功能，适合作为`<script>`标签。（如果要为应用程序创建一个捆绑包，您可能想要使用它，因为它会使文件大小变小。）
  - `system` - SystemJS 加载器格式

### cjs

```js
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const add = (a, b) => a + b;

exports.add = add;
```

### esm

```js
const add = (a, b) => a + b;

export { add };
```

### iife

```js
var math = (function(exports) {
  'use strict';

  const add = (a, b) => a + b;

  exports.add = add;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
})({});
```

### umd

```js
(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
    ? define(['exports'], factory)
    : ((global =
        typeof globalThis !== 'undefined' ? globalThis : global || self),
      factory((global.math = {})));
})(this, function(exports) {
  'use strict';

  const add = (a, b) => a + b;

  exports.add = add;

  Object.defineProperty(exports, '__esModule', { value: true });
});
```

## 插件

[plugins](https://github.com/rollup/plugins)

```js
import pkg from './package.json';
// 等 rollup-plugin-vue 发版后在切换官方版
// 暂时先用本地的 rollup-plugin-vue
// 修复了 render 函数的编译问题，但是还没发版
// import vuePlugin from 'rollup-plugin-vue'
const vuePlugin = require('./rollup-plugin-vue/index');
import scss from 'rollup-plugin-scss';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

const name = 'Element3';

const createBanner = () => {
  return `/*!
  * ${pkg.name} v${pkg.version}
  * (c) ${new Date().getFullYear()} kkb
  * @license MIT
  */`;
};

const createBaseConfig = () => {
  return {
    input: 'src/entry.js',
    external: ['vue'],
    plugins: [
      peerDepsExternal(),
      babel(),
      resolve({
        extensions: ['.vue', '.jsx'],
      }),
      commonjs(),
      json(),
      vuePlugin({
        css: true,
      }),
      scss(),
    ],
    output: {
      sourcemap: false,
      banner: createBanner(),
      externalLiveBindings: false,
      globals: {
        vue: 'Vue',
      },
    },
  };
};

function mergeConfig(baseConfig, configB) {
  const config = Object.assign({}, baseConfig);
  // plugin
  if (configB.plugins) {
    baseConfig.plugins.push(...configB.plugins);
  }

  // output
  config.output = Object.assign({}, baseConfig.output, configB.output);

  return config;
}

function createFileName(formatName) {
  return `dist/element3-ui.${formatName}.js`;
}

// es-bundle
const esBundleConfig = {
  plugins: [
    replace({
      __DEV__: `(process.env.NODE_ENV !== 'production')`,
    }),
  ],
  output: {
    file: createFileName('esm-bundler'),
    format: 'es',
  },
};

// es-browser
const esBrowserConfig = {
  plugins: [
    replace({
      __DEV__: true,
    }),
  ],
  output: {
    file: createFileName('esm-browser'),
    format: 'es',
  },
};

// es-browser.prod
const esBrowserProdConfig = {
  plugins: [
    terser(),
    replace({
      __DEV__: false,
    }),
  ],
  output: {
    file: createFileName('esm-browser.prod'),
    format: 'es',
  },
};

// cjs
const cjsConfig = {
  plugins: [
    replace({
      __DEV__: true,
    }),
  ],
  output: {
    file: createFileName('cjs'),
    format: 'cjs',
  },
};
// cjs.prod
const cjsProdConfig = {
  plugins: [
    terser(),
    replace({
      __DEV__: false,
    }),
  ],
  output: {
    file: createFileName('cjs.prod'),
    format: 'cjs',
  },
};

// global
const globalConfig = {
  plugins: [
    replace({
      __DEV__: true,
      'process.env.NODE_ENV': true,
    }),
  ],
  output: {
    file: createFileName('global'),
    format: 'iife',
    name,
  },
};
// global.prod
const globalProdConfig = {
  plugins: [
    terser(),
    replace({
      __DEV__: false,
    }),
  ],
  output: {
    file: createFileName('global.prod'),
    format: 'iife',
    name,
  },
};

const formatConfigs = [
  esBundleConfig,
  esBrowserProdConfig,
  esBrowserConfig,
  cjsConfig,
  cjsProdConfig,
  globalConfig,
  globalProdConfig,
];

function createPackageConfigs() {
  return formatConfigs.map(formatConfig => {
    return mergeConfig(createBaseConfig(), formatConfig);
  });
}

export default createPackageConfigs();
```
