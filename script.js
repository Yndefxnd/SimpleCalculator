const buttons = document.querySelectorAll(".buttons button");
const display = document.querySelector(".display");
const regex = /^[0-9.+\-×÷]$/;
// console.log(buttons)

const btns = buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;
    const expression = display.value;

    const operators = ["+", "-", "×", "÷", "."];

    if (!["=", "C", "⟶", ".", "+", "-", "×", "÷"].includes(value)) {
      display.value += value;
    }

    if (value === "C") {
      display.value = "";
      return;
    }

    if (value === "⟶") {
      display.value = display.value.slice(0, -1);
      return;
    }

    if (value === "=") {
      if (display.value.trim() === "") {
        return;
      } else {
        const result = eval(
          display.value.replace(/×/g, "*").replace(/÷/g, "/")
        );
        display.value = result;
      }
    }

    if (operators.includes(value)) {
      const lastChar = display.value[display.value.length - 1];

      if (operators.includes(lastChar)) {
        return;
      } else {
        display.value += value;
        return;
      }
    }
  });
});
document.addEventListener("keydown", (event) => {
  const key = event.key;
  const regex = /^[0-9.+\-×÷]$/;

  if (key === "Backspace") {
    event.preventDefault(); // чтобы не срабатывало по умолчанию
    display.value = display.value.slice(0, -1);
    return;
  }

    if (key == "=") {
      if (display.value.trim() === "") {
        return;
      } else {
        const result = eval(
          display.value.replace(/×/g, "*").replace(/÷/g, "/")
        );
        display.value = result;
      }
  }

  if (regex.test(key)) {
    event.preventDefault();
    display.value += key;
    return;
  }

  if (/[a-zа-я]/i.test(key)) {
    event.preventDefault(); // блокируем буквы
    return;
  }

  event.preventDefault(); // всё остальное тоже блокируем
});

