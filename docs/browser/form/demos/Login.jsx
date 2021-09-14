import React, { useEffect } from 'react';

export default function Login() {
  function handleSubmit(event) {
    event.preventDefault();
  }

  useEffect(() => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', handleSubmit);
    return () => {
      loginForm.removeEventListener('submit', handleSubmit);
    };
  });

  return (
    <form name="login" id="loginForm">
      <p>
        <label>用户名</label>
        <br />
        <input placeholder="请输入用户名" name="userName" />
      </p>
      <p>
        <label>密码</label>
        <br />
        <input placeholder="请输入密码" type="password" name="password" />
      </p>
      <button>Login</button>
    </form>
  );
}
