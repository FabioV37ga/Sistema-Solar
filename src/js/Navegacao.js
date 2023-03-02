/* 
Classe Navegacao
    - Essa classe é responsável por criar, controlar e apagar os elementos de Navegação.
    - Essa classe é invocada através dos arquivo "Janela.js" e "Incio.js".

Índice
    1 Atributos
        1.1 elemento_jquery_head → string elemento '.nav-header'
        1.2 elemento_html_head_home → elemento html .home
        1.3 elemento_html_head_volumeContainer → elemento html .volume-container
        1.4 elemento_html_head_barraVolume → elemento html input[type=range]
    2 Métodos
        2.1 criar(tipo) → Cria elementos da classe
            2.1.1 tipo 1 → Cria elementos nav.header
            2.1.1 tipo 2 → Cria elementos nav.footer
        2.2 selecionar() → Atribui o campo html aos atributos _html
        2.3 controlar() → Adiciona função aos itens da navegação.
   */
class Navegacao {
    static elemento_jquery_head = `
    <section class="nav-header">
        <div class="left">
            <a href="" class="nav-header-item home">
                <img src="src/img/home.png">
            </a>
            <div class="volume-container">
                <a class="nav-header-item volume">
                    <img src="src/img/volume_1.png" alt="">
                </a>
                <input type="range" min="0" max="100" value="5">
            </div>
        </div>
        <div class="right">
            <a href="https://github.com/FabioV37ga/Sistema-Solar" class="nav-header-item git"><img src="src/img/git.svg" alt=""></a>
        </div>
    </section>
    `;

    static elemento_html_head_home;
    static elemento_html_head_volumeContainer;
    static elemento_html_head_barraVolume;


    static criar(tipo) {
        if (tipo == 1) {
            $(this.elemento_jquery_head).insertBefore(".janela");
        }
        this.selecionar();
    }

    static selecionar() {
        this.elemento_html_head_home = document.querySelector(".home")
        this.elemento_html_head_volumeContainer = document.querySelector(".volume-container")
        this.elemento_html_head_barraVolume = document.querySelector(".volume-container").children[1]

        this.controlar();
    }

    static controlar() {

        // ICONE VOLUME
        //     → Mostra o range de volume quando mouseover
        this.elemento_html_head_volumeContainer.addEventListener("mouseover", () => {
            this.elemento_html_head_barraVolume.style = "display: initial;"
        })
        //     → Esconde o range de volume quando mouseover
        this.elemento_html_head_volumeContainer.addEventListener("mouseout", () => {
            this.elemento_html_head_barraVolume.style = "display: none;"
        })
        //     → Coloca função no click do volume
        this.elemento_html_head_volumeContainer.children[0].addEventListener("click", () => {
            //          → Alterna entre MUTE e VOL=10, trocando para as imagens respectivas.
            if (window.audioStatus == 1) {
                this.elemento_html_head_barraVolume.value = 0
                window.audio.volume = 0;
                window.audioStatus = 0;
                this.elemento_html_head_volumeContainer.children[0].children[0].src = "src/img/volume_0.png"
            } else {
                this.elemento_html_head_barraVolume.value = 5
                window.audio.volume = 0.05
                window.audioStatus = 1;
                this.elemento_html_head_volumeContainer.children[0].children[0].src = "src/img/volume_1.png"
            }
        })
        //     → Coloca função no range de volume
        this.elemento_html_head_barraVolume.addEventListener("input", () => {
            //          → Sempre que o usuário mover o range, faz volume = range.value
            window.audio.volume = this.elemento_html_head_barraVolume.value / 100
            //          → Sessão responsável por trocar as imagens do icone de volume dependendo no volume:
            //          VOL = 0
            if (this.elemento_html_head_barraVolume.value == 0) {
                this.elemento_html_head_volumeContainer.children[0].children[0].src = "src/img/volume_0.png"
                window.audioStatus = 0;
            } else {
                window.audioStatus = 1;
            }

            //          VOL = 1-35
            if (this.elemento_html_head_barraVolume.value <= 35
                && this.elemento_html_head_barraVolume.value > 0) {
                this.elemento_html_head_volumeContainer.children[0].children[0].src = "src/img/volume_1.png"
                //          VOL = 36-75
            } else if (this.elemento_html_head_barraVolume.value > 35
                && this.elemento_html_head_barraVolume.value <= 75) {
                this.elemento_html_head_volumeContainer.children[0].children[0].src = "src/img/volume_2.png"
                //          VOL = 76-100
            } else if (this.elemento_html_head_barraVolume.value > 75
                && this.elemento_html_head_barraVolume.value <= 100) {
                this.elemento_html_head_volumeContainer.children[0].children[0].src = "src/img/volume_3.png"
            }
        })
    }
}