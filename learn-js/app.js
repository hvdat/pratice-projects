let inputText = document.querySelector('input[type="checkbox"]');

document.onkeyup = (e) => {
  switch (e.key) {
    case "Enter":
      document
        .getElementsByClassName("heading")[0]
        .classList.toggle("color-red");
      break;
  }
};
