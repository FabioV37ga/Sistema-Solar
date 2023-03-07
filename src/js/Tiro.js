class Tiro {
    static elemento_jquery_tiro = $('<div>', { class: "tiro" })
    static atirando = 0;
    static id = 0;
    static audio = new Audio("src/sound/shoot.mp3");
    id;
    posicao;
    tipo;
    x;
    y;
    elemento_html;

    constructor(posicao, tipo) {
        this.posicao = posicao;
        this.tipo = tipo;
        Tiro.id++
        this.id = Tiro.id;
        this.criar()
    }

    criar() {
        // Cria elementos
        $(".gun")[0] == null ? $("<div>", { class: "gun" }).appendTo(".playarea") : null;
        $("<div>", { class: "tiro", id: this.id }).appendTo(".gun");
        if (Tiro.audio.paused) {
            // Emite som de tiro
            Tiro.audio.volume = 0.08
            Tiro.audio.play()
        } else {
            // Caso já haja um som sendo emitido, recomeça ele se houver outra execução.
            Tiro.audio.currentTime = 0
        }
        // Define posição que deverá ser criado a partir da posição atual do player
        this.x = parseInt(this.posicao.toString().split(',')[0])
        this.y = parseInt(this.posicao.toString().split(',')[1])
        // Seleciona elemento html equivalente a essa instância
        var atual = this.selecionar();
        // 
        // Define a posição da nave.
        atual.style.top = this.y + "px"
        atual.style.left = this.x + "px"
        // Mostra o tiro
        atual.style.opacity != "100%" ? atual.style.opacity = "100%" : 0;

        var intervalo = setInterval(() => {
            // Enquanto o tiro for visivel na tela...
            if (this.x < 680) {
                // Move o tiro para a direita
                this.x++
                atual.style.left = this.x + "px"
                // Quando o tiro chega em campo inimigo
                if (atual.style.left == "582px") {
                    // Verifica se atingiu algum inimigo
                    verificarTiro()
                }
            }
            // Quando o tiro sai de enquadramento
            else {
                // Remove e limpa intervalo
                atual.remove()
                clearInterval(intervalo)
            }
        }, 1);

        var y = this.y
        // Verifica se essa instância de Tiro acertou um alvo
        function verificarTiro() {
            var campo = document.querySelector(".enemyArea")
            var nave = document.querySelectorAll(".shipBay")
            // Valores do primeiro quadrante de inimigos:
            var teto = -223
            var chao = -176
            // Verifica todos os quadrantes inimigos a busca de naves.
            for (let i = 0; i <= campo.children.length - 1; i++) {
                // Quando acha um quadrante que tem nave...
                if (nave[i].children.length > 0) {
                    //    Verifica se essa instância de tiro tem Y dentro do quadrante inimigo
                    // que possui a nave.
                    if (y >= `${teto + (i * 50)}` &&
                        y <= `${chao + (i * 50)}`) {
                        // Tiro acertou um inimigo.
                        // Remove o tiro da tela
                        atual.remove()
                        // Explode a nave atingida
                        NaveInimiga.explodir(i)
                    } else {
                        // Tiro não acertou um inimigo.
                    }
                }
            }
        }
    }

    // Método utilizado para atribuir essa instância de Tiro a um elemento .tiro no html.
    // Utiliza o ID da nave.
    selecionar() {
        this.elemento_html = document.querySelectorAll(".tiro")
        for (let i = 0; i <= this.elemento_html.length - 1; i++) {
            if (this.elemento_html[i].id == this.id) {
                return this.elemento_html[i];
            }
        }
    }
}