const imagensCards = [
  "../images/bobrossparrot.gif",
  "../images/explodyparrot.gif",
  "../images/fiestaparrot.gif",
  "../images/metalparrot.gif",
  "../images/revertitparrot.gif",
  "../images/tripletsparrot.gif",
  "../images/unicornparrot.gif",
];
let spanPlayer = document.querySelector(".player");
const playerName = localStorage.getItem("player");
spanPlayer.innerHTML = `<span class="player">${playerName}</span>`;
const startTimer = () => {};
let sec;
let containerNum = [];
let containerGirados = [];
let leq = [];
let pontos = 0;
let rounds = 0;
let cTempo;

function pedeNumCartas() {
  let numCartas;

  while (!(numCartas % 2 === 0 && numCartas >= 4 && numCartas <= 14)) {
    numCartas = prompt(
      "Com quantas cards deseja jogar?\n número par entre 4 e 14"
    );
  }

  return numCartas;
}

function comparaSort() {
  return Math.random() - 0.5;
}

function darCartas(numeroCartas) {
  for (let i = 0; i < numeroCartas / 2; i++) {
    leq.push(...[{ nome: imagensCards[i] }, { nome: imagensCards[i] }]);
  }
  leq.sort(comparaSort);

  let cards = document.querySelector(".cards");
  cards.innerHTML = leq
    .map((item) => {
      return `<div class='card_container' onclick="flipCartd(this)">
              <div data-test="card"  class="card frontal">
                  <img data-test="face-down-image" src='../images/back.png' />
              </div>
              <div data-test="face-up-image"    class="card back">
                  <img  src='${item.nome}' />
              </div>
            </div>`;
    })
    .join("");
}

const iniciaTimer = () => {
  sec = 0;
  const timer = document.querySelector(".timer");
  timer.innerHTML = `${sec}`;
  const atualizaTimer = () => {
    sec++;
    timer.innerHTML = `${sec}`;
    setTimeout(atualizaTimer, 1000);
  };
  setTimeout(atualizaTimer, 1000);
};
const iniciaJogo = () => {
  const numeroCartas = pedeNumCartas();
  const imagensEmbaralhadas = imagensCards.sort(comparaSort);
  darCartas(numeroCartas, imagensEmbaralhadas);
  iniciaTimer();
};

const tiraFlip = () => {
  containerNum.forEach((carta) => carta.classList.remove("flip"));
  add();
  containerNum = [];
};
function add() {
  for (let i = 0; i < containerNum.length; i++) {
    containerNum[i].setAttribute("onclick", "flipCartd(this)");
  }
}
function remove() {
  for (let i = 0; i < containerNum.length; i++) {
    containerNum[i].removeAttribute("onclick");
  }
}

function verificarCard() {
  const [card1, card2] = containerGirados;
  if (card1 && card2) {
    document.querySelector(".container").classList.add("trava-card");
    if (card1 === card2) {
      remove();
      containerGirados = [];
      containerNum = [];
      pontos++;
      setTimeout(
        () =>
          document.querySelector(".container").classList.remove("trava-card"),
        700
      );
    } else {
      setTimeout(tiraFlip, 1500);
      containerGirados = [];
      setTimeout(
        () =>
          document.querySelector(".container").classList.remove("trava-card"),
        1500
      );
    }
  }
}

async function fim() {
  clearInterval(cTempo);
  alert(`Você ganhou em ${rounds} rounds!\nTempo: ${sec}`);
  const pergunta = await new Promise((resolve) => {
    const input = prompt("Reiniciar?\n sim ou não");
    resolve(input);
  });

  if (pergunta === "sim") {
    leq = [];
    containerNum = [];
    containerGirados = [];
    pontos = 0;
    rounds = 0;
    iniciaJogo();
  }
}

const seraFim = (numeroCartas) => {
  pontos === numeroCartas / 2 && setTimeout(fim, 1000);
};

const flipCartd = (el) => {
  const cartaVirada = el.querySelector(".back img").getAttribute("src");
  el.classList.toggle("flip");
  containerNum.push(el);
  containerGirados.push(cartaVirada);

  containerNum.forEach((carta) => carta.removeAttribute("onclick"));

  verificarCard();

  rounds++;
  seraFim(leq.length);
};

iniciaJogo();
