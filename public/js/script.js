function counter() {
  let countdown = 2;

  let timerDiv = document.getElementById("timer");
  // let path = window.location.href;
  // path=path.split("/")
  // let path2=path[0]+"//"+path[2]+"/"+path[3]

  let timer = setInterval(function () {
    timerDiv.innerHTML;
    countdown--;
    if (countdown === 0) {
      clearInterval(timer);
      window.location.href = "../" //path2
    }
  }, 1000);
}