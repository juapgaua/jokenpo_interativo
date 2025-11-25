const opcoesJogador = document.querySelectorAll(".opcao-player");
const opcoesComputador = document.querySelectorAll(".opcao-comp");

const textoComputador = document.getElementById("texto-computador");
const textoResultado = document.getElementById("texto-resultado");

const spanVitorias = document.getElementById("vitorias");
const spanDerrotas = document.getElementById("derrotas");
const spanEmpates = document.getElementById("empates");

const btnReiniciar = document.getElementById("btn-reiniciar");

let vitorias = 0, derrotas = 0, empates = 0;

// Jogador clica em uma opção
opcoesJogador.forEach(div => {
    div.addEventListener("click", () => {
        const escolhaJogador = div.dataset.opcao;

        atualizarJogadorVisual(escolhaJogador);
        jogarRodada(escolhaJogador);
    });
});

// Função principal
function jogarRodada(escolhaJogador) {
    const escolhaComputador = gerarEscolhaComputador();

    atualizarComputadorVisual(escolhaComputador);

    const resultado = decidirResultado(escolhaJogador, escolhaComputador);
    atualizarPlacar(resultado);

    mostrarMensagemResultado(escolhaJogador, escolhaComputador, resultado);
}

// Escolha aleatória do computador
function gerarEscolhaComputador() {
    const op = ["pedra", "papel", "tesoura"];
    return op[Math.floor(Math.random() * 3)];
}

// Destaque do jogador
function atualizarJogadorVisual(escolha) {
    opcoesJogador.forEach(div => {
        const opcao = div.dataset.opcao;
        div.classList.remove("selecionada", "nao-selecionada");

        if (opcao === escolha) div.classList.add("selecionada");
        else div.classList.add("nao-selecionada");
    });
}

// Destaque do computador
function atualizarComputadorVisual(escolha) {
    opcoesComputador.forEach(div => {
        const opcao = div.dataset.opcao;
        div.classList.remove("selecionada", "nao-selecionada");

        if (opcao === escolha) div.classList.add("selecionada");
        else div.classList.add("nao-selecionada");
    });
}

// Lógica do jogo
function decidirResultado(jogador, computador) {
    if (jogador === computador) return "empate";

    const vence = {
        pedra: "tesoura",
        papel: "pedra",
        tesoura: "papel"
    };

    return vence[jogador] === computador ? "vitoria" : "derrota";
}

// Atualiza placar
function atualizarPlacar(resultado) {
    if (resultado === "vitoria") spanVitorias.textContent = ++vitorias;
    if (resultado === "derrota") spanDerrotas.textContent = ++derrotas;
    if (resultado === "empate") spanEmpates.textContent = ++empates;
}

// Resultado final
function mostrarMensagemResultado(jogador, computador, res) {

    // texto comum que deve continuar normal
    let mensagem = `Você escolheu ${jogador} e o computador escolheu ${computador}. `;

    // texto destacado
    let destaque = "";
    let classeDestaque = "";

    if (res === "vitoria") {
        destaque = "VOCÊ GANHOU!";
        classeDestaque = "resultado-vitoria";
    } 
    else if (res === "derrota") {
        destaque = "VOCÊ PERDEU!";
        classeDestaque = "resultado-derrota";
    } 
    else {
        destaque = "DEU EMPATE!";
        classeDestaque = "resultado-empate";
    }

    // Monta o HTML final com destaque apenas no final
    textoResultado.innerHTML = `
        ${mensagem}
        <span class="resultado-extra ${classeDestaque}">${destaque}</span>
    `;
}

// Reiniciar jogo
btnReiniciar.addEventListener("click", () => {
    vitorias = derrotas = empates = 0;

    spanVitorias.textContent = 0;
    spanDerrotas.textContent = 0;
    spanEmpates.textContent = 0;

    // limpar destaques do jogador e do computador
    opcoesJogador.forEach(div => div.classList.remove("selecionada", "nao-selecionada"));
    opcoesComputador.forEach(div => div.classList.remove("selecionada", "nao-selecionada"));

    // 🔥 AQUI está a correção principal:
    textoResultado.innerHTML = "Faça sua escolha para começar o jogo.";

    // opcional: remove classes de destaque (vitória/derrota/empate)
    textoResultado.className = "";
});
