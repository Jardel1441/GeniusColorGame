let order = [];
let clickedOrder = [];
let score = 0;

// 0 = verde
// 1 = vermelho
// 2 = amarelo
// 3 = azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green'); // Corrigir a seleção para '.green'
const yellow = document.querySelector('.yellow'); // Corrigir a seleção para '.yellow'

// Cria ordem aleatória de cores
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for (let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

// Acende a próxima cor
let lightColor = (element, number) => {
    number = number * 1000; // Ajustei o tempo para 1000ms
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 500);
    setTimeout(() => {
        element.classList.remove('selected');
    }, number);
}

// Checa se os botões clicados são os mesmos da ordem gerada do jogo
let checkOrder = () => {
    for (let i in clickedOrder) {
        if (clickedOrder[i] !== order[i]) {
            gameOver();
            return; // Corrigi para evitar que continue verificando após o erro.
        }
    }
    if (clickedOrder.length === order.length) {
        alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
        nextLevel();
    }
}

// Função para o clique do usuário
let click = (color) => {
    clickedOrder.push(color);
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250);
}

// Função que retorna a cor
let createColorElement = (color) => {
    if (color === 0) {
        return green;
    } else if (color === 1) {
        return red;
    } else if (color === 2) {
        return yellow;
    } else if (color === 3) {
        return blue;
    }
}

// Função para o próximo nível do jogo
let nextLevel = () => {
    score++;
    shuffleOrder();
}

// Função para Game Over
let gameOver = () => {
    alert(`Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em OK para Iniciar um novo jogo`);
    order = [];
    clickedOrder = [];

    playGame();
}

// Função do início do jogo
let playGame = () => {
    alert('Bem-vindo ao Gênisis! Iniciando novo jogo!');
    score = 0;

    nextLevel();
}

// Eventos de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

// Início do jogo
playGame();
