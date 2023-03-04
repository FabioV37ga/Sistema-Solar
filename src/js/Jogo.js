class Jogo {
    static elemento_jquery_jogo = `
    <section class="jogo">
        <div class="playarea">
        </div>
    </section>
    `;
    static elemento_html_jogo;

    static moveState_y = 0; // 0 - parado | 1 - subindo | 2 - descendo
    static moveState_x = 0; // 0 - parado | 1 - esquerda | 2 - direita

    static background = 0; // 0 - parado | 1 - lento (estetico) | 2 - rapido (funcional)

    static criar() {
        // Cria elemento jquery
        $(".janela").append(this.elemento_jquery_jogo);
        this.selecionar();
        Nave.criar()
    }

    static selecionar() {
        this.elemento_html_jogo = document.querySelector(".jogo");
    }

    static iniciar() {
        window.pause = 1
        // mostra tutorial
        // quando usuario apertar alguma seta, ativa movimentação,
        this.ativarMovimentacao()
        // Liga background dinamico
        // this.ativarBackground()
    }

    static ativarMovimentacao() {
        // 1.Sessão Movimentação eixo y:
        // 1.1. Y.keydown
        var up = 38;
        var down = 40;
        document.querySelector("body").addEventListener("keydown", function (event) {
            // Usuario aperta [↑]
            if (event.keyCode == up) {
                // Se não estiver se movimentando
                if (Jogo.moveState_y == 0) {
                    // Subir
                    Jogo.moveState_y = 1
                    Nave.mover_y(Jogo.moveState_y)
                } else if (Jogo.moveState_y == 1) {
                    // trava execução multipla enquanto segura
                } else if (Jogo.moveState_y == 2) {
                    // Se estiver descendo, para e sobe
                    Jogo.moveState_y = 0;
                    Nave.mover_y(Jogo.moveState_y)
                }
            }
            // Usuario aperta [↓]
            else if (event.keyCode == down) {
                // Se não estiver se movimentando
                if (Jogo.moveState_y == 0) {
                    // Desce
                    Jogo.moveState_y = 2
                    Nave.mover_y(Jogo.moveState_y)
                } else if (Jogo.moveState_y == 2) {
                    // trava execução multipla enquanto segura
                } else if (Jogo.moveState_y == 1) {
                    // Se estiver subindo, para e desce
                    Jogo.moveState_y = 0;
                    Nave.mover_y(Jogo.moveState_y)
                }
            }
        })
        // 1.2. Y.keyup
        document.querySelector("body").addEventListener("keyup", function (event) {
            // Usuario solta [↑]
            if (event.keyCode == up) {
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
            else if (event.keyCode == down) {
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
        var left = 39;
        var right = 37;
        document.querySelector("body").addEventListener("keydown", function (event) {
            // Usuario aperta [←]
            if (event.keyCode == left) {
                // Se não estiver se movimentando
                if (Jogo.moveState_x == 0) {
                    // esquerda
                    Jogo.moveState_x = 1
                    Nave.mover_x(Jogo.moveState_x)
                } else if (Jogo.moveState_x == 1) {
                    // trava execução multipla enquanto segura
                } else if (Jogo.moveState_x == 2) {
                    // Se estiver direita, para e esquerda
                    Jogo.moveState_x = 0;
                    Nave.mover_x(Jogo.moveState_x)
                }
            }
            // Usuario aperta [→]
            else if (event.keyCode == right) {
                // Se não estiver se movimentando
                if (Jogo.moveState_x == 0) {
                    // direita
                    Jogo.moveState_x = 2
                    Nave.mover_x(Jogo.moveState_x)
                } else if (Jogo.moveState_x == 2) {
                    // trava execução multipla enquanto segura
                } else if (Jogo.moveState_x == 1) {
                    // Se estiver esquerda, para e direita
                    Jogo.moveState_x = 0;
                    Nave.mover_x(Jogo.moveState_x)
                }
            }
        })
        // 2.2. X.keyup
        document.querySelector("body").addEventListener("keyup", function (event) {
            // Usuario solta [←]
            if (event.keyCode == left) {
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
            else if (event.keyCode == right) {
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
}