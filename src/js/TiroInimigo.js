class TiroInimigo {
    static elemento_jquery = ``
    static id = 0;
    elemento_html;
    id;
    x;
    y;

    constructor(y) {
        TiroInimigo.id++
        this.id = TiroInimigo.id
        this.y = y
        this.criar()
    }

    criar() {
        var campo = document.querySelectorAll(".shipBay")
        $("<div>", { class: "tiroInimigo", id: this.id }).appendTo(campo[this.y].children[0]);
        this.controlar();
    }

    controlar() {
        var atual = this.selecionar()
        animar()

        var x = 10;
        function animar() {
            var intervalo = setInterval(() => {
                x++;
                if (x < 645) {
                    atual.style = `left: ${x}px`
                } else {
                    atual.remove();
                    clearInterval(intervalo)
                }
            }, 1);
        }

    }

    selecionar() {
        this.elemento_html = document.querySelectorAll(".tiroInimigo")
        for (let i = 0; i <= this.elemento_html.length - 1; i++) {
            if (this.elemento_html[i].id == this.id) {
                return this.elemento_html[i];
            }
        }
    }
}