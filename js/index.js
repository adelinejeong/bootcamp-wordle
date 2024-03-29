const 정답 = "APPLE";

let attemps = 0;
let index = 0;
let timer;

function appStart() {
  //게임 종료로 나타나는 메세지 효과 구현
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료되었습니다.";
    div.style =
      "display:flex; justify-contents:center; align-items:center; position:absolute; top:40vh; left:35vw; background-color:white; width:200px; height:100px;";
    document.body.appendChild(div);
  };
  const nextLine = () => {
    if (attemps === 6) return gameover();
    attemps += 1;
    index = 0;
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };

  const handleEnterKey = () => {
    let 맞은_갯수 = 0;
    //정답확인코드
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-column[data-index='${attemps}${i}'`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;
        block.style.background = "#6AAA64";
      } else if (정답.includes(입력한_글자)) block.style.background = "#C9B458";
      else block.style.background = "#787C7E";
      block.style.color = "white";
    }
    if (맞은_갯수 === 5) gameover();
    else nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-column[data-index='${attemps}${index - 1}'`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };
  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-column[data-index='${attemps}${index}'`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index++;
    }
  };

  const startTimer = () => {
    const 시작_시간 = new Date();

    function setTime() {
        const 현재_시간 = new Date();
        const 흐른_시간 = new Date(현재_시간 - 시작_시간);
        const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
        const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
        const timeDiv = document.querySelector("#timer");
        timeDiv.innerText = `${분}:${초}`;
    }

    timer = setInterval(setTime, 1000);

  };

  startTimer();
  window.addEventListener("keydown", handleKeydown);
}
appStart();
