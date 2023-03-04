class Nave {
    static elemento_jquery = `
    <div class = "ship ally"><img src="src/img/ship-ally.png" alt=""></div>
    `;
    static elemento_html_playArea;
    static elemento_html_nave;
    static statusY = 0;
    static statusX = 0;
    static x = 209;
    static y = 0;
    static criar() {
        $(".playarea").append(this.elemento_jquery);
        this.selecionar();
    }

    static selecionar() {
        this.elemento_html_nave = document.querySelector(".ally");
        this.controlar();
    }

    static controlar() {
        this.elemento_html_nave.addEventListener("animationend", () => {
            Jogo.iniciar()
        });
    }

    static mover_y(direcao) {

        // Direções: 0 - Parado | 1 - Cima | 2 - Baixo

        // Parar eixo Y
        if (direcao == 0) {
            Nave.statusY = 0;
            anima(direcao)

        }
        // Mover para cima
        else if (direcao == 1) {
            Nave.statusY = 1;
            anima(direcao)

        }
        // Mover para baixo
        else if (direcao == 2) {
            Nave.statusY = 1;
            anima(direcao)

        }

        // Inicia animação
        function anima(arg) {
            var intervalo = setInterval(() => {
                // Para a animação se statusY = 0
                if (Nave.statusY == 0) {
                    clearInterval(intervalo)
                } else {
                    // Se a direção for 1, move para cima
                    if (direcao == 1) {
                        if (Nave.y > -215) {
                            Nave.y--
                            Nave.elemento_html_nave.style.top = `${Nave.y}px`
                        }
                    }
                    // Se a direção for 2, move para baixo
                    else if (direcao == 2) {
                        if (Nave.y < 215) {
                            Nave.y++
                            Nave.elemento_html_nave.style.top = `${Nave.y}px`
                        }
                    }
                }
            }, 1);
        }

    }

    static mover_x(direcao) {
        // Direções: 0 - Parado | 1 - Direita | 2 - Esquerda

        // Parar eixo x
        if (direcao == 0) {
            Nave.statusX = 0;
            anima(direcao)

        }
        // Mover para a direita
        else if (direcao == 1) {
            Nave.statusX = 1;
            anima(direcao)

        }
        // Mover para a esquerda
        else if (direcao == 2) {
            Nave.statusX = 1;
            anima(direcao)

        }

        // Inicia animação
        function anima(arg) {
            var intervalo = setInterval(() => {
                // Para animação se statusX = 0
                if (Nave.statusX == 0) {
                    clearInterval(intervalo)
                } else {
                    // Se for 1, move para a direita;
                    if (direcao == 1) {
                        direcao = 1
                        if (Nave.x < 210) {
                            Nave.x++
                            Nave.elemento_html_nave.style.left = `${Nave.x}px`
                        }
                    }
                    // Se for 2, move para a esquerda;
                    else if (direcao == 2) {
                        if (Nave.x > 0) {
                            Nave.x--
                            Nave.elemento_html_nave.style.left = `${Nave.x}px`
                        }
                    }
                }
            }, 1);
        }
    }
}