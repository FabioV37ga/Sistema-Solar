class Tutorial {
    static tipo = 0;
    static elemento_tutorial_jquery;
    static elemento_tutorial_html;

    static criar(tipo) {
        console.log("teste")
        this.tipo = tipo;
        this.selecionar()
        $(".jogo").prepend(this.elemento_tutorial_jquery)
    }

    static selecionar() {
        this.elemento_tutorial_jquery = `
            <div class="tutorial _${this.tipo}"></div>
        `
        this.elemento_tutorial_html = $(".tutorial")
    }

    static apagar(){
        this.selecionar()
        this.elemento_tutorial_html.remove()
        console.log("!")
    }
}