function counter() {
  let countdown = 2;
  var pathActual = window.location.href
  pathActual=pathActual.split("/")
  var pathRelativa=pathActual[0]+"//"+pathActual[2]+"/"+pathActual[3]
  let timerDiv = document.getElementById("timer");

  let timer = setInterval(function () {
    timerDiv.innerHTML = `Regresando a Home: ${countdown} `;
    countdown--;
    if (countdown === 0) {
      clearInterval(timer);
      window.location.href = pathRelativa
    }
  }, 1000);
}

// function counter() {
//   let countdown = 2;

//   let timerDiv = document.getElementById("timer");

//   let timer = setInterval(function () {
//     timerDiv.innerHTML;
//     countdown--;
//     if (countdown === 0) {
//       clearInterval(timer);
//       window.location.href = "../"
//     }
//   }, 1000);
// }

// let path = window.location.href;
// path=path.split("/")
// let path2=path[0]+"//"+path[2]+"/"+path[3]
