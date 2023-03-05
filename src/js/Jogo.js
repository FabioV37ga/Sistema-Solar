class Jogo {
    static elemento_jquery_jogo = `
    <section class="jogo">
        <div class="playarea">
        </div>
    </section>
    `;
    static elemento_html_jogo;
    static elemento_html_janela;

    static faseAtual = 0;
    static enableMove = 0;
    static moveState_y = 0; // 0 - parado | 1 - subindo | 2 - descendo
    static moveState_x = 0; // 0 - parado | 1 - esquerda | 2 - direita

    static criar() {
        // Cria elemento jquery
        $(".janela").append(this.elemento_jquery_jogo);
        this.selecionar();
        Nave.criar()
    }

    static selecionar() {
        this.elemento_html_jogo = document.querySelector(".jogo");
        Jogo.janela = document.querySelector("body").parentElement;
    }

    static iniciar() {
        window.pause = 1
        // mostra tutorial
        // quando usuario apertar alguma seta, ativa movimentação,
        Jogo.tutorial(1)
        // Liga background dinamico
        // this.ativarBackground()
    }

    static tutorial(tutorial) {
        switch (tutorial) {
            case 1:
                // Tutorial de movimentação
                Tutorial.criar(1)
                function handleTutorial1(event) {
                    if (event.keyCode == 37 || event.key == 'w' ||
                        event.keyCode == 38 || event.key == 'a' ||
                        event.keyCode == 39 || event.key == 's' ||
                        event.keyCode == 40 || event.key == 'd') {
                        setTimeout(() => {
                            Jogo.janela.removeEventListener("keydown", handleTutorial1)
                            Tutorial.apagar()
                            Jogo.ativarMovimentacao()
                            Jogo.avancarFase()
                        }, 25);
                    }
                }
                Jogo.janela.addEventListener("keydown", handleTutorial1)
                break;
            case 2:
                Tutorial.criar(2)
                Jogo.enableMove = 0
                function handleTutorial2(event) {
                    if (event.keyCode == 32) {
                        setTimeout(() => {
                            Jogo.janela.removeEventListener("keydown", handleTutorial2)
                            Tutorial.apagar()
                            // NaveInimiga.ativar()
                            Jogo.enableMove = 1;
                        }, 25);
                    }
                }
                Jogo.janela.addEventListener("keydown", handleTutorial2)
                break;
        }
    }

    static ativarMovimentacao() {
        Jogo.enableMove = 1;
        // 1.Sessão Movimentação eixo y:
        // 1.1. Y.keydown
        var up = 38;
        var down = 40;
        Jogo.janela.addEventListener("keydown", function (event) {
            if (Jogo.enableMove == 1) {
                // Usuario aperta [↑]
                if (event.keyCode == up || event.key == 'w') {
                    // Se não estiver se movimentando
                    if (Jogo.moveState_y == 0) {
                        // Subir
                        setTimeout(() => {
                            Jogo.moveState_y = 1
                            Nave.mover_y(Jogo.moveState_y)
                        }, 5);
                    } else if (Jogo.moveState_y == 1) {
                        // trava execução multipla enquanto segura
                    } else if (Jogo.moveState_y == 2) {
                        // Se estiver descendo, para 
                        Jogo.moveState_y = 0;
                        Nave.mover_y(Jogo.moveState_y)
                        // e sobe
                        setTimeout(() => {
                            Jogo.moveState_y = 1;
                            Nave.mover_y(Jogo.moveState_y)
                        }, 10);
                    }
                }
                // Usuario aperta [↓]
                else if (event.keyCode == down || event.key == 's') {
                    // Se não estiver se movimentando
                    if (Jogo.moveState_y == 0) {
                        // Desce
                        setTimeout(() => {
                            Jogo.moveState_y = 2
                            Nave.mover_y(Jogo.moveState_y)
                        }, 5);
                    } else if (Jogo.moveState_y == 2) {
                        // trava execução multipla enquanto segura
                    } else if (Jogo.moveState_y == 1) {
                        // Se estiver subindo, para 
                        Jogo.moveState_y = 0;
                        Nave.mover_y(Jogo.moveState_y)
                        // e desce
                        setTimeout(() => {
                            Jogo.moveState_y = 2;
                            Nave.mover_y(Jogo.moveState_y)
                        }, 10);
                    }
                }
            }
        })
        // 1.2. Y.keyup
        Jogo.janela.addEventListener("keyup", function (event) {
            // Usuario solta [↑]
            if (event.keyCode == up || event.key == 'w') {
                // Se a tecla solta for igual a direção atual
                if (Jogo.moveState_y == 1) {
                    // PARA DE SE MOVER PRA CIMA;
                    Jogo.moveState_y = 0;
                    Nave.mover_y(Jogo.moveState_y)
                }
                // Se a tecla solta for diferente da direção atual
                else {
                    // Não faz nada
                }
            }
            // Usuario solta [↓]
            else if (event.keyCode == down || event.key == 's') {
                // Se a tecla solta for igual a direção atual
                if (Jogo.moveState_y == 2) {
                    // PARA DE SE MOVER PRA BAIXO;
                    Jogo.moveState_y = 0;
                    Nave.mover_y(Jogo.moveState_y)
                }
                // Se a tecla solta for diferente da direção atual
                else {
                    // Não faz nada
                }
            }
        })

        // 2. Sessão movimentação eixo x
        // 2.1 X.keydown
        var esquerda = 37;
        var direita = 39;
        Jogo.janela.addEventListener("keydown", function (event) {
            if (Jogo.enableMove == 1) {
                // Usuario aperta [→]
                if (event.keyCode == direita || event.key == 'd') {
                    // Se não estiver se movimentando
                    if (Jogo.moveState_x == 0) {
                        // esquerda
                        setTimeout(() => {
                            Jogo.moveState_x = 1
                            Nave.mover_x(Jogo.moveState_x)
                        }, 5);
                    } else if (Jogo.moveState_x == 1) {
                        // trava execução multipla enquanto segura
                    } else if (Jogo.moveState_x == 2) {
                        // Se estiver direita, para e esquerda
                        Jogo.moveState_x = 0;
                        Nave.mover_x(Jogo.moveState_x)
                        setTimeout(() => {
                            Jogo.moveState_x = 1;
                            Nave.mover_x(Jogo.moveState_x)
                        }, 10);
                    }
                }
                // Usuario aperta [←]
                else if (event.keyCode == esquerda || event.key == 'a') {
                    // Se não estiver se movimentando
                    if (Jogo.moveState_x == 0) {
                        // direita
                        setTimeout(() => {
                            Jogo.moveState_x = 2
                            Nave.mover_x(Jogo.moveState_x)
                        }, 5);
                    } else if (Jogo.moveState_x == 2) {
                        // trava execução multipla enquanto segura
                    } else if (Jogo.moveState_x == 1) {
                        // Se estiver esquerda, para e direita
                        Jogo.moveState_x = 0;
                        Nave.mover_x(Jogo.moveState_x)
                        setTimeout(() => {
                            Jogo.moveState_x = 2;
                            Nave.mover_x(Jogo.moveState_x)
                        }, 10);
                    }
                }
            }
        })
        // 2.2. X.keyup
        Jogo.janela.addEventListener("keyup", function (event) {
            // Usuario solta [←]
            if (event.keyCode == direita || event.key == 'd') {
                // Se a tecla solta for igual a direção atual
                if (Jogo.moveState_x == 1) {
                    // PARA DE SE MOVER PRA ESQUERDA
                    Jogo.moveState_x = 0;
                    Nave.mover_x(Jogo.moveState_x)
                }
                // Se a tecla solta for diferente da direção atual
                else {
                    // Não faz nada
                }
            }
            // Usuario solta [→]
            else if (event.keyCode == esquerda || event.key == 'a') {
                // Se a tecla solta for igual a direção atual
                if (Jogo.moveState_x == 2) {
                    // PARA DE SE MOVER PRA DIREITA;
                    Jogo.moveState_x = 0;
                    Nave.mover_x(Jogo.moveState_x)
                }
                // Se a tecla solta for diferente da direção atual
                else {
                    // Não faz nada
                }
            }
        })
    }

    static avancarFase() {
        Jogo.faseAtual <= 8 ? Jogo.faseAtual++ : Jogo.faseAtual;
        switch (Jogo.faseAtual) {
            case 1:
                var fase_1 = new Fase(1, '3', '3,3')
                break;
        }

    }
}