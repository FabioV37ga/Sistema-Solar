class Fase {
    static progressao = 0;
    numero;
    inimigos;
    duracao;
    planeta;
    estado;
    constructor(numero, inimigos, duracao) {
        this.numero = numero;
        this.inimigos = inimigos.split('').length > 1 ? inimigos.split(",") : inimigos
        this.duracao = duracao.split('').length > 1 ? duracao.split(",") : duracao
        this.planeta = numero;
        this.estado = 0
        this.iniciar()
    }

    iniciar() {
        console.log(`[#${Fase.faseAtual}] Fase iniciada. \n`)
        console.log(`[#${Fase.faseAtual}] Viagem inciada: Planeta anterior → Confronto atual \n`)
        Fase.progressao = 1
        this.viajar(1)
        Jogo.viajar()
    }

    viajar(arg) {
        if (arg == 1) {
            this.estado = 0
            setTimeout(() => {
                console.log(`[#${Fase.faseAtual}] Viagem Finalizada: Planeta anterior → Confronto atual \n`)

                NaveInimiga.criar(this.inimigos)

                console.log(`[#${Fase.faseAtual}] Confronto iniciado\n`)

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
            if (this.estado != 0) {

            } else {
                this.estado = 1
                // código não consegue chegar aqui
                console.log(`[#${Jogo.faseAtual}] Confronto: Todos os inimigos foram eliminados.`)
                console.log(`[#${Jogo.faseAtual}] Viagem Iniciada: Confronto atual → Planeta atual \n`)
                console.log(`[#${Jogo.faseAtual}] Planeta: planeta criado. \n`)
                Planeta.criar(Jogo.faseAtual, 1)
                setTimeout(() => {
                    console.log(`[#${Jogo.faseAtual}] Planeta: Planeta movendo\n`)
                    Planeta.mostrar()

                }, parseInt((this.duracao[1]) * 1000) - 2000);
                setTimeout(() => {
                    console.log(`[#${Jogo.faseAtual}] Planeta: Planeta centralizado\n`)
                    console.log(`[#${Jogo.faseAtual}] Viagem Finalizada: Confronto atual → Planeta atual \n`)
                    Fase.progressao = 0
                }, parseInt(this.duracao[1]) * 1000);
            }
        }
    }
}