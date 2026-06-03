const canvas = document.getElementById('labirintoCanvas');
const ctx = canvas.getContext('2d');
const mensagem = document.getElementById('mensagem');

const TAMANHO_BLOCO = 40;

// Matriz do Labirinto: 1 = Parede, 0 = Caminho, 2 = Início, 3 = Destino
let labirinto = [
    [1,1,1,1,1,1,1,1,1,1],
    [1,2,0,0,1,0,0,0,0,1],
    [1,1,1,0,1,0,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,1],
    [1,0,1,1,1,1,1,0,1,1],
    [1,0,1,0,0,0,0,0,0,1],
    [1,0,1,0,1,1,1,1,0,1],
    [1,0,0,0,1,0,0,1,0,1],
    [1,1,1,0,0,0,1,0,3,1],
    [1,1,1,1,1,1,1,1,1,1]
];

// Posição inicial do jogador baseada na matriz
let jogadorX = 1;
let jogadorY = 1;

// Função responsável por desenhar o labirinto na tela
function desenharLabirinto() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let r = 0; r < labirinto.length; r++) {
        for (let c = 0; c < labirinto[r].length; c++) {
            if (labirinto[r][c] === 1) {
                ctx.fillStyle = '#1b5e20'; // Paredes (representando cercas ou arbustos)
                ctx.fillRect(c * TAMANHO_BLOCO, r * TAMANHO_BLOCO, TAMANHO_BLOCO, TAMANHO_BLOCO);
            } else if (labirinto[r][c] === 3) {
                ctx.fillStyle = '#fbc02d'; // Objetivo final
                ctx.font = "30px Arial";
                ctx.fillText("⭐", c * TAMANHO_BLOCO + 5, r * TAMANHO_BLOCO + 30);
            }
        }
    }

    // Desenha o Personagem (Agrinho - Círculo Verde Claro)
    ctx.fillStyle = '#4caf50';
    ctx.beginPath();
    ctx.arc(jogadorX * TAMANHO_BLOCO + TAMANHO_BLOCO/2, jogadorY * TAMANHO_BLOCO + TAMANHO_BLOCO/2, TAMANHO_BLOCO/3, 0, 2 * Math.PI);
    ctx.fill();
}

// Função para mover o personagem e checar colisões
function mover(direcao) {
    let novoX = jogadorX;
    let novoY = jogadorY;

    if (direcao === 'cima') novoY--;
    if (direcao === 'baixo') novoY++;
    if (direcao === 'esquerda') novoX--;
    if (direcao === 'direita') novoX++;

    // Se o próximo bloco não for uma parede (1), atualiza a posição
    if (labirinto[novoY][novoX] !== 1) {
        jogadorX = novoX;
        jogadorY = novoY;
    }

    // Se alcançou a estrela (3)
    if (labirinto[jogadorY][jogadorX] === 3) {
        mensagem.innerHTML = "🎉 <strong>Parabéns!</strong> Você conectou o campo e a cidade de forma sustentável!";
    }

    desenharLabirinto();
}

// Escuta os eventos das setas do teclado
window.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowUp') mover('cima');
    if (e.key === 'ArrowDown') mover('baixo');
    if (e.key === 'ArrowLeft') mover('esquerda');
    if (e.key === 'ArrowRight') mover('direita');
});

// Inicializa o jogo na tela
desenharLabirinto();
