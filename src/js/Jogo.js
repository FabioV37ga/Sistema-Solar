class Jogo {
    static elemento_jquery_jogo = `
    <section class="jogo">
        <div class="playarea">
        </div>
    </section>
    `;
    static elemento_html_jogo;

    static criar(){
        $(".janela").append(this.elemento_jquery_jogo);
        this.selecionar();
        Nave.criar()
    }

    static selecionar(){
        this.elemento_html_jogo = document.querySelector(".jogo");
    }

    static iniciar(){
        window.pause = 1
        Nave.liberar()
        window.alert("Inicio de jogo! utilize as setas para jogar.")
    }
}