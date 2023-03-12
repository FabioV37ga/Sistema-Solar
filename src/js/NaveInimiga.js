/*
Classe NaveInimiga
    - Essa classe é responsável por criar, controlar, animar e apagar os elementos que constituem as naves inimigas

Índice
    1. Atributos
        1.1 Elemento_jquery_enemyarea → String dos elementos a serem criados '.enemyArea'
        1.2 elemento_jquery_nave → String dos elementos a serem criados '.ship.enemy'
        1.3 audioExplosao → Audio da explosão da nave
        1.4 elementos_html_* → Atributos que selecionam os elementos criados anteriormente
        1.5 estado → Essa variável determina se a nave está ativa/viva. 0/1 - desligado/ligado
    2. Métodos
        2.1 criar() →  
            2.1.1 function single() →
            2.1.2 function multiple() →
        2.2 selecionar() →
        2.3 explodir() →
*/
class NaveInimiga {
    static ship_placeholder;
    static elemento_jquery_enemyArea = `
    <div class="enemyArea">
        <div class="shipBay __1"></div>
        <div class="shipBay __2"></div>
        <div class="shipBay __3"></div>
        <div class="shipBay __4"></div>
        <div class="shipBay __5"></div>
        <div class="shipBay __6"></div>
        <div class="shipBay __7"></div>
        <div class="shipBay __8"></div>
        <div class="shipBay __9"></div>
    </div>
    `;
    static elemento_jquery_nave = `
    <div class="ship enemy">
        <img src="src/img/ship-enemy.png" value="1">
    </div>`
    static audio = new Audio('src/sound/boom.wav')
    static elemento_html_enemyArea;
    static elemento_html_enemyShipbay;
    static estado = 1;

    static criar(arg) {
        // Cria elementos do Campo inimigo.
        $(".jogo").append(NaveInimiga.elemento_jquery_enemyArea);
        // Verifica se existe mais de 1 inimigo em campo
        arg.toString().split('') > 1 ? single() : multiple();

        // Cria elementos da(s) nave(s) inimiga(s).
        function single() {
            $(`.__${arg}`).append(NaveInimiga.elemento_jquery_nave)
        }
        function multiple() {
            NaveInimiga.selecionar()
            for (let inimigo = 0; inimigo <= arg.length - 1; inimigo++) {
                $(`.__${arg[inimigo]}`).append(NaveInimiga.elemento_jquery_nave)
            }
        }
    }

    static selecionar() {
        this.elemento_html_enemyArea = $(".enemyArea")
        this.elemento_html_enemyShipbay = document.querySelectorAll(".shipBay")
    }

    static explodir(nave) {
        // Elemento correspondente a nave inimiga a ser destruida
        var atual = $(".shipBay")[nave].children[0];
        // Emite som de explosão apenas uma vez se for atingida
        if (atual.value != 0) {
            this.audio.volume = 0.1
            this.audio.play()
            atual.value = 0
        }

        console.log(`[#${Jogo.faseAtual}] Nave no quadrante ${nave + 1} atingida.`)

        // Troca de imagem fazendo uma animação de explosão
        var img = 0;
        // Em resumo, faz um loop com intervalo que da a impressão de animação
        var intervalo = setInterval(() => {
            if (atual) {
                img++
                atual.children[0].src = `src/img/boom_${img}.png`
                // quando terminar a animação, apaga o elemento e para o intervalo.
                if (img == 8) {
                    atual.remove();
                    if (this.estado == 1) {
                        this.estado = 0
                        Jogo.verificaInimigos()
                        setTimeout(() => {
                            this.estado = 1
                        }, 100);
                    }
                    clearInterval(intervalo)
                }
            }
        }, 100);
    }
}