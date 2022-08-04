---
title: Apifox
---

## 公共脚本

### Auth

```js
const cryptoJs = require('crypto-js');
const moment = require('moment');

const username = pm.environment.get('USERNAME');
const password = pm.environment.get('PASSWORD');
const baseUrl = pm.environment.get('LOGIN_URL');
const accessToken = pm.environment.get('ACCESS_TOKEN');
const accessTokenExpires = pm.environment.get('ACCESS_TOKEN_EXPIRES');

// 定义发送登录接口请求方法
function sendLoginRequest() {
  const loginRequest = {
    url: baseUrl + '/user-web/common/user/login',
    method: 'POST',
    header: 'Content-Type: application/json',
    body: {
      mode: 'raw',
      raw: JSON.stringify({
        userName: username,
        password: cryptoJs.MD5(password).toString(),
        language: 'zh-CN',
        appCode: 'IRUN',
      }),
    },
  };

  // 发送请求。
  // pm.sendrequest 参考文档: https://www.apifox.cn/help/app/scripts/api-references/pm-reference/#pm-sendrequest
  pm.sendRequest(loginRequest, function(err, res) {
    if (err) {
      console.log('login error', err);
      return;
    }
    const jsonData = res.json();
    // 将 accessToken 写入环境变量 ACCESS_TOKEN
    pm.environment.set('ACCESS_TOKEN', jsonData.body.token);

    pm.environment.set(
      'ACCESS_TOKEN_EXPIRES',
      moment()
        .add(1, 'days')
        .valueOf(),
    );
  });
}

function isExpires() {
  if (!accessTokenExpires) {
    return true;
  }

  return new Date(accessTokenExpires) <= new Date();
}

if (!accessToken || isExpires()) {
  sendLoginRequest();
}
```
