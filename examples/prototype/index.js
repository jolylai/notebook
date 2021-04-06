// (function() {
//   function Controller() {
//     this.errors = [];
//   }
//   Controller.prototype.showDialog = function showDialog(title, message) {
//     console.log(title, message);
//   };
//   Controller.prototype.success = function success(message) {
//     this.showDialog('success', message);
//   };
//   Controller.prototype.failure = function failure(message) {
//     this.showDialog('failure', message);
//   };
//   function LoginController() {
//     Controller.call(this);
//   }
//   LoginController.prototype = Object.create(Controller.prototype);
//   LoginController.prototype.getUserName = function getUserName() {
//     return document.getElementById('userName').value;
//   };
//   LoginController.prototype.getPassword = function getPassword() {
//     return document.getElementById('password').value;
//   };
//   LoginController.prototype.validate = function validate(userName, password) {
//     userName = userName || this.getUserName();
//     password = password || this.getPassword();
//     if (!(userName && password)) {
//       return this.failure('请输入用户名和秘密');
//     }
//     return true;
//   };
//   // 重写基类的 failure
//   LoginController.prototype.failure = function loginFailure(err) {
//     // super 调用
//     Controller.prototype.failure.call(this, `login validate: ${err}`);
//   };
//   function AuthController(login) {
//     Controller.call(this);
//     this.login = login;
//   }
//   AuthController.prototype = Object.create(Controller.prototype);
//   AuthController.prototype.request = function request() {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve('request success');
//       }, 1000);
//     });
//   };
//   AuthController.prototype.checkAuth = function checkAuth() {
//     const userName = this.login.getUserName();
//     const password = this.login.getPassword();
//     if (this.login.validate(userName, password)) {
//       this.request()
//         .then(this.success.bind(this))
//         .catch(this.failure.bind(this));
//     }
//   };
//   AuthController.prototype.success = function authSuccess() {
//     Controller.prototype.success.call(this, 'AuthSuccess');
//   };
//   AuthController.prototype.failure = function authFailure(err) {
//     Controller.prototype.failure.call(this, `Auth Error: ${err}`);
//   };
//   const auth = new AuthController(new LoginController());

//   const submitBtn = document.getElementById('submitBtn');

//   submitBtn.addEventListener('click', function onSubmit(event) {
//     event.preventDefault();
//     auth.checkAuth();
//   });
// })();

(function() {
  const LoginController = {
    errors: [],
    getUserName: function() {
      return document.getElementById('userName').value;
    },
    getPassword: function() {
      return document.getElementById('password').value;
    },
    validate: function() {
      const userName = this.getUserName();
      const password = this.getPassword();

      if (!(userName && password)) {
      }
    },
  };
})();
