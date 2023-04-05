const input = document.querySelector(".login-input");
const button = document.querySelector(".login-button");
const form = document.querySelector(".login-form");

const validacao = ({ target }) => {
  if (target.value.length >= 3) {
    button.removeAttribute("disabled");
    return;
  }
  button.setAttribute("disabled", "");
};

const handleSubmit = (event) => {
  event.preventDefault(); // prevent default

  localStorage.setItem("player", input.value);
  window.location = "pages/game.html";
};

input.addEventListener("input", validacao);
form.addEventListener("submit", handleSubmit);

// Login Finalized
