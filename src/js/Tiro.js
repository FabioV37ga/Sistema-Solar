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
        console.log(this.id)
    }

    criar() {
        // Tiro.id++
        // $(".gun")[0] == null ? $("<div>", { class: "gun"}).appendTo(".playarea") : null;
        // $("<div>", { class: "tiro" , id: this.id}).appendTo(".gun");

        // this.selecionar()
        // console.log(this.id + " disparado.")

        // this.x = parseInt(this.posicao.toString().split(',')[0])
        // this.y = parseInt(this.posicao.toString().split(',')[1])

        // this.elemento_html[this.id].style.top = this.y + "px"
        // this.elemento_html[this.id].style.left = this.x + "px"

        // var intervalo = setInterval(() => {
        //     if (this.elemento_html[this.id].style.left < "680px") {
        //         this.x++
        //         this.elemento_html[this.id].style.left = this.x + "px"
        //     } else {
        //         console.log(this.id + "AQUI ↓")
        //         console.log(this.elemento_html[this.id])
        //         this.elemento_html[this.id].remove();
        //         Tiro.id = 0;
        //         clearInterval(intervalo);
        //     }
        // }, 1);
        $(".gun")[0] == null ? $("<div>", { class: "gun" }).appendTo(".playarea") : null;
        $("<div>", { class: "tiro", id: this.id }).appendTo(".gun");


        this.x = parseInt(this.posicao.toString().split(',')[0])
        this.y = parseInt(this.posicao.toString().split(',')[1])

        var atual = this.selecionar();
        console.log(`[${atual.id}]`)

        atual.style.top = this.y + "px"
        
        var intervalo = setInterval(() => {
            if (this.x < 680) {
                this.x++
                atual.style.left = this.x + "px"
                atual.style.opacity != "100%" ? atual.style.opacity = "100%" : 0;
            } else {
                atual.remove()
                clearInterval(intervalo)
            }
        }, 1);



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