class Tiro {
    static elemento_jquery_tiro = $('<div>', { class: "tiro" })
    static atirando = 0;
    static id = 0;
    id_;
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
        $(".gun")[0] == null ? $("<div>", { class: "gun" }).appendTo(".playarea") : null;
        $("<div>", { class: "tiro", id: this.id }).appendTo(".gun");


        this.x = parseInt(this.posicao.toString().split(',')[0])
        this.y = parseInt(this.posicao.toString().split(',')[1])

        var atual = this.selecionar();


        atual.style.top = this.y + "px"

        var intervalo = setInterval(() => {
            if (this.x < 680) {
                this.x++
                atual.style.left = this.x + "px"
                atual.style.opacity != "100%" ? atual.style.opacity = "100%" : 0;
                if (atual.style.left == "582px") {
                    verificarTiro()
                }
            }
            else {
                atual.remove()
                clearInterval(intervalo)
            }
        }, 1);

        var y = this.y
        function verificarTiro() {
            var campo = document.querySelector(".enemyArea")
            var nave = document.querySelectorAll(".shipBay")
            var teto = -223
            var chao = -176

            for (let i = 0; i <= campo.children.length - 1; i++) {
                if (nave[i].children.length > 0) {
                    if (y >= `${teto + (i * 50)}` && y <= `${chao + (i * 50)}`) {
                        console.log("acerto.")
                        // nave[i].children[0].remove()
                        atual.remove()
                        NaveInimiga.explodir(i)
                    } else {
                        console.log("erro.")
                    }
                }
            }
        }
    }

    selecionar() {
        this.elemento_html = document.querySelectorAll(".tiro")
        for (let i = 0; i <= this.elemento_html.length - 1; i++) {
            if (this.elemento_html[i].id == this.id) {
                return this.elemento_html[i];
            }
        }
    }
}