class Fase {
    static progressao = 0;
    numero;
    inimigos;
    duracao;
    planeta;
    constructor(numero, inimigos, duracao) {
        this.numero = numero;
        this.inimigos = inimigos.split('').length > 1 ? inimigos.split(",") : inimigos
        this.duracao = duracao.split('').length > 1 ? duracao.split(",") : duracao
        this.planeta = numero;
        this.iniciar()
    }

    iniciar() {
        console.log(`[#${this.numero}] Fase iniciada. \n`)
        console.log(`[#${this.numero}] Viagem inciada: Planeta anterior → Confronto atual \n`)
        Fase.progressao = 1
        this.viajar(1)
    }

    viajar(arg) {

        Fase.janela = document.querySelector(".janela");
        var posicaoAtual = parseInt(Fase.janela.style.backgroundPositionX.toString().replace("px", ""))
        var intervalo = setInterval(() => {
            if (Fase.progressao == 1){
                posicaoAtual--
                Fase.janela.style = `background-position-x: ${posicaoAtual}px;`
            }else{
                clearInterval(intervalo)
            }
            // console.log("Avanço atual: " + posicaoAtual)
        }, 1);

        if (arg == 1) {
            setTimeout(() => {
                console.log(`[#${this.numero}] Viagem Finalizada: Planeta anterior → Confronto atual \n`)

                NaveInimiga.criar(this.inimigos)

                console.log(`[#${this.numero}] Confronto iniciado\n`)

                document.querySelector(".enemyArea").addEventListener("animationend", () => {
                    if (this.numero == 1) {
                        Jogo.tutorial(2)
                        // this.viajar(2)
                    } else {
                        // NaveInimiga.ativar()
                    }
                })
            }, parseInt(this.duracao[0]) * 1000);
        } else {
            console.log("penis ga")
        }
    }
}