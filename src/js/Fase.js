class Fase {
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
        this.viajar(1)
    }



    viajar(arg) {
        // Fase.janela = document.querySelector(".janela");
        // var posicaoAtual = parseInt(document.querySelector(".janela").style.backgroundPositionX.toString().replace("px",""))
        // var intervalo = setInterval(() => {
        //     posicaoAtual -= this.velocidade;
        //     this.janela.style = `background-position-x: ${posicaoAtual}px;`
        //     console.log("Avanço atual: "+this.avanco)
        // }, 1);
        if (arg == 1) {
            setTimeout(() => {
                for (let nave = 0; nave <= this.inimigos.length-1; nave++){
                    // NaveInimiga.criar(this.inimigos[nave])
                }

                // ANIMATIONEND ENEMYSHIP:
                if (this.numero == 1){
                    Jogo.tutorial(2)
                }else{
                    // NaveInimiga.ativar()
                }
            }, this.duracao[0] * 1000);
        }
    }
}