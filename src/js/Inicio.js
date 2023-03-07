class Inicio {
    static elementos_jquery = `
    <div class="inicio" style="display: none">
        <div class="conteudo-inicio">
            <img src="src/img/logo.png" alt="">
            <br>
            <button>Iniciar</button>
        </div>
    </div>`;

    static elemento_html_inicio;
    static elemento_html_conteudoInicio;
    static elemento_html_botao;

    static criar() {
        $(".janela").append(this.elementos_jquery);
    }

    static selecionar() {
        this.elemento_html_inicio = document.querySelector(".inicio");
        this.elemento_html_conteudoInicio = document.querySelector(".conteudo-inicio");
        this.elemento_html_botao = document.querySelector(".conteudo-inicio").children[2];
    }

    static animar(tipo) {
        Inicio.selecionar();
        if (tipo == 1) {
            this.elemento_html_inicio.style = ""
            var margin = -415;
            var intervalo = setInterval(() => {
                margin++
                this.elemento_html_conteudoInicio.style = `margin: auto ${margin}px`
                if (margin == 130) {
                    clearInterval(intervalo)
                    this.controlar();
                }
            }, 1);
        }
    }

    static controlar() {
        var button_hover;
        var button_click;
        var button_out;

        this.elemento_html_botao.addEventListener("mouseover", () => {
            if (button_hover) {
                button_hover.pause()
            }
            button_hover = new Audio("src/sound/button-hover.mp3");
            button_hover.play()
        })

        this.elemento_html_botao.addEventListener("mouseout", () => {
            if (button_out) {
                button_out.pause()
            }
            button_out = new Audio("src/sound/button-out.mp3");;
            button_out.play()
        })

        function handleClick() {
            console.log(`[Inicio] Iniciar`)
            Inicio.elemento_html_botao.removeEventListener("click", handleClick)
            button_click = new Audio("src/sound/button-click.mp3");;
            button_click.play()
            
            window.pause = 1;
            setTimeout(() => {
                Janela.animar(2, "l")
            }, 13);
            
            Inicio.apagar();
        }
        this.elemento_html_botao.addEventListener("click", handleClick)
    }



    static apagar() {

        Inicio.elemento_html_inicio.addEventListener("animationend", () => {
            Inicio.elemento_html_inicio.remove()
        })
        Inicio.elemento_html_inicio.classList.add("some");
        Jogo.criar()
    }
}