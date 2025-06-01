const EggTime = Object.freeze({
    SOFT_BOILED: 1 / 20,
    MEDIUM_BOILED: 1 / 10,
    HARD_BOILED: 1 / 5,
});


const RouteToEggType = {
    '/mole': 'SOFT_BOILED',
    '/ao-ponto': 'MEDIUM_BOILED',
    '/dura': 'HARD_BOILED'
};

const EggTypeToImagePath = {
    'RAW': '/images/raw-egg.png',
    'SOFT_BOILED': '/images/soft-boiled-egg.png',
    'MEDIUM_BOILED': '/images/boiled-egg.png',
    'HARD_BOILED': '/images/hard-boiled-egg.png'
}

const EggStateToMessage = {
    'RAW': 'Ovo cru',
    'SOFT_BOILED': 'Ovo mole',
    'MEDIUM_BOILED': 'Ovo ao ponto',
    'HARD_BOILED': 'Ovo duro'
};

document.addEventListener('DOMContentLoaded', function () {



    const timerDisplay = document.getElementById('timer-display');
    const startButton = document.getElementById('start');
    const pauseButton = document.getElementById('pause');
    const resumeButton = document.getElementById('resume');
    const resetButton = document.getElementById('reset');
    const progressBar = document.getElementById('progress');
    const mensagem = document.getElementById('mensagem');
    const imagem = document.getElementById('current-egg-state');

    const currentPath = window.location.pathname;

    const eggType = RouteToEggType[currentPath] || 'MEDIUM_BOILED';

    const tempoMinutos = EggTime[eggType];


    let tempoTotalSegundos = tempoMinutos * 60;
    let tempoRestante = tempoTotalSegundos;
    let timerInterval = null;

    function formatarTempo(segundos) {
        const minutos = Math.floor(segundos / 60);
        const segs = segundos % 60;
        return `${minutos.toString().padStart(2, '0')}:${segs.toString().padStart(2, '0')}`;
    }

    function atualizarProgresso() {
        const porcentagem = (tempoRestante / tempoTotalSegundos) * 100;
        progressBar.style.width = `${porcentagem}%`;

        const tempoCorrido = tempoTotalSegundos - tempoRestante;
        const tempoTransisao = 0
        if (tempoCorrido >= (EggTime['HARD_BOILED'] * 60) - tempoTransisao) {
            mensagem.textContent = EggStateToMessage['HARD_BOILED'];
            imagem.src = EggTypeToImagePath['HARD_BOILED'];
        } else if (tempoCorrido > (EggTime['MEDIUM_BOILED'] * 60) - tempoTransisao) {
            mensagem.textContent = EggStateToMessage['MEDIUM_BOILED'];
            imagem.src = EggTypeToImagePath['MEDIUM_BOILED'];
        } else if (tempoCorrido > (EggTime['SOFT_BOILED'] * 60) - tempoTransisao) {
            mensagem.textContent = EggStateToMessage['SOFT_BOILED'];
            imagem.src = EggTypeToImagePath['SOFT_BOILED'];
        } else {
            mensagem.textContent = EggStateToMessage['RAW'];
            imagem.src = EggTypeToImagePath['RAW'];
        }

    }

    // Inicializa o timer
    timerDisplay.textContent = formatarTempo(tempoRestante);
    atualizarProgresso();

    // Função para iniciar o timer
    function iniciarTimer() {
        startButton.style.display = 'none';
        pauseButton.style.display = 'inline-block';
        resetButton.style.display = 'inline-block';

        timerInterval = setInterval(function () {
            if (tempoRestante <= 0) {
                clearInterval(timerInterval);
                timerDisplay.textContent = "00:00";
                progressBar.style.width = "0%";
                alert("Tempo esgotado! Seu ovo tá pronto!!!");
                return;
            }

            tempoRestante--;
            timerDisplay.textContent = formatarTempo(tempoRestante);
            atualizarProgresso();
        }, 1000);
    }

    function pausarTimer() {
        clearInterval(timerInterval);
        pauseButton.style.display = 'none';
        resumeButton.style.display = 'inline-block';
    }

    function retomarTimer() {
        resumeButton.style.display = 'none';
        pauseButton.style.display = 'inline-block';
        iniciarTimer();
    }

    function resetarTimer() {
        clearInterval(timerInterval);
        tempoRestante = tempoTotalSegundos;
        timerDisplay.textContent = formatarTempo(tempoRestante);
        atualizarProgresso();

        startButton.style.display = 'inline-block';
        pauseButton.style.display = 'none';
        resumeButton.style.display = 'none';
        resetButton.style.display = 'none';
        imagem.src = EggTypeToImagePath['RAW'];
    }

    startButton.addEventListener('click', iniciarTimer);
    pauseButton.addEventListener('click', pausarTimer);
    resumeButton.addEventListener('click', retomarTimer);
    resetButton.addEventListener('click', resetarTimer);
});