// for (var i = 0; i <= 5; i++) {
//   setTimeout(
//     (i) => {
//       console.log(i);
//     },
//     i * 1000,
//     i,
//   );
// }

// function wait(message) {

//   setTimeout(() => {
//     console.log(message);
//   }, 0);
// }

// wait('message');

var data = [];

for (let i = 0; i < 3; i++) {
  data[i] = function() {
    console.log(i);
  };
}

data[0]();
data[1]();
data[2]();
