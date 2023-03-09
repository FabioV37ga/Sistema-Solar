/*
Classe Jogo
    - Essa classe é responsável por criar o elemento que comporta o jogo.
    - Também é responsável por receber os inputs do usuário [↑w][↓s][←a][→d][space]
Índice
    1 Atributos
        1.1 elemento_jquery_jogo → string elemento 'sect.jogo>div.playArea'
        1.2 elemento_html_jogo → elemento html .jogo
        1.3 elemento_html_janela → elemento html .playArea
        1.4 faseAtual → Armazena fase atual.
        1.5 enableMove → Alterna entre movimento da dave ativado e desativado. (0 , 1)
        1.6/7 moveState_x/y → Armazena informação do estado do movimento da nave de x e y.
    2 Métodos
        2.1 criar(tipo) → Cria elementos 'elementos_jquery_jogo', chama 'selecionar()' e chama 'nave.criar()'
        2.2 selecionar() → Atribui os elementos html aos atributos do tipo '_html'
        2.3 iniciar() → Inicia jogo. chama 'tutorial(1)'.
        2.4 tutorial() → Mostra os tutoriais ao longo do jogo. 
            [1]: Tutorial de movimentação. Aguarda input de [↑w][↓s][←a][→d] para chamar 'ativarMovimentacao()'
                 e também 'avancarFase()'.
            [2]: Tutorial de combate. Trava movimentação e aguarda input de [Space] para liberar movimentação.
        2.5 ativarMovimentacao() → Adiciona função as teclas [↑w][↓s][←a][→d], em resumo, existe uma função que
                                   é adicionada ao 'keydown' das teclas que ativa a movimentação no eixo respectivo 
                                   e outra que é adicionada ao 'keyup' das teclas que desativa a movimentação no 
                                   eixo respectivo. Existem também outras regras p/ fazer  um "overlapse" da direção
                                   baseado nas teclas pressionadas e soltas;
        2.6 avancarFase() → Adiciona +1 na fase atual (inicializada como 0). Também cria uma instância da 
                          classe Fase com informações da fase atual.
*/
class Jogo {
    static elemento_jquery_jogo = `
    <section class="jogo">
        <div class="playarea">
        </div>
    </section>
    `;
    static elemento_html_jogo;
    static elemento_html_janela;
    static fase;
    static faseAtual = 0;
    static enableMove = 0;
    static moveState_y = 0; // 0 - parado | 1 - subindo | 2 - descendo
    static moveState_x = 0; // 0 - parado | 1 - esquerda | 2 - direita
    static enableShoot = 1;

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
                    // Aguarda input de alguma tecla de movimentação do usuário
                    if (event.keyCode == 37 || event.key == 'w' ||
                        event.keyCode == 38 || event.key == 'a' ||
                        event.keyCode == 39 || event.key == 's' ||
                        event.keyCode == 40 || event.key == 'd') {
                        setTimeout(() => {
                            Jogo.janela.removeEventListener("keydown", handleTutorial1)
                            Tutorial.apagar()
                            // Quando recebe, ativa movimentação e começa fase 1:
                            Jogo.ativarMovimentacao()
                            Jogo.avancarFase()
                        }, 25);
                    }
                }
                Jogo.janela.addEventListener("keydown", handleTutorial1)
                break;
            case 2:
                // Tutorial de combate
                Tutorial.criar(2)
                Jogo.enableMove = 0
                function handleTutorial2(event) {
                    // Aguarda input da tecla [espaço]
                    if (event.keyCode == 32) {
                        setTimeout(() => {
                            Jogo.janela.removeEventListener("keydown", handleTutorial2)
                            Tutorial.apagar()
                            // Quando recebe, ativa combate
                            Jogo.ativarArmas()
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

    static ativarArmas() {
        Jogo.janela.addEventListener("keydown", function (e) {
            if (e.keyCode == 32 && Jogo.enableMove == 1 && (Jogo.shootState == 0 || Jogo.shootState == null)) {
                if (Jogo.enableShoot == 1) {
                    Nave.shootState = 1
                    Nave.atirar(1)
                }
            }
        })

        Jogo.janela.addEventListener("keyup", function (e) {
            if (e.keyCode == 32 && Jogo.enableMove == 1) {
                Nave.shootState = 0
            }
        })
    }

    static avancarFase() {
        // Limita o número de fases em 8 e incrementa a cada execução
        Jogo.enableShoot = 1;
        Jogo.faseAtual <= 8 ? Jogo.faseAtual++ : Jogo.faseAtual;
        switch (Jogo.faseAtual) {
            // Switch para escolher a fase atual e informações numéricas das fases.
            case 1:
                Jogo.fase = new Fase(1, '3,6', '2,3')
                break;
            case 2:
                Jogo.fase = new Fase(2, '2,7', '2,3')
                break;
        }

    }

    static verificaInimigos() {
        if (document.querySelector(".enemy")) {

        } else {
            document.querySelector(".enemyArea").remove()
            Jogo.enableShoot = 0;
            Jogo.fase.viajar(2);
            Jogo.viajar()
        }
    }

    static viajar() {
        Fase.janela = document.querySelector(".janela");
        var posicaoAtual = parseInt(Fase.janela.style.backgroundPositionX.toString().replace("px", ""))
        var intervalo = setInterval(() => {
            if (Fase.progressao == 1) {
                posicaoAtual--
                Fase.janela.style = `background-position-x: ${posicaoAtual}px;`
            } else {
                clearInterval(intervalo)
            }
            // console.log("Avanço atual: " + posicaoAtual)
        }, 1)
    }
}