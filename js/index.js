let attemps = 0;
let index = 0;

function appStart() {
  const handleEnterKey = () => {
    //정답확인코드
  };
  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-column[data-index='${attemps}${index}'`
    );

    if (event.key === "Enter") {
      handleEnterKey();
    } else if (index === 5) return;
    else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index++;
    }
  };

window.addEventListener("keydown", handleKeydown);
};
appStart();
