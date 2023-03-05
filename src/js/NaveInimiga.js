class NaveInimiga {

    static ship_placeholder;
    static elemento_jquery_enemyArea = `
    <div class="enemyArea">
        <div class="shipBay __1"></div>
        <div class="shipBay __2"></div>
        <div class="shipBay __3"></div>
        <div class="shipBay __4"></div>
        <div class="shipBay __5"></div>
        <div class="shipBay __6"></div>
        <div class="shipBay __7"></div>
        <div class="shipBay __8"></div>
        <div class="shipBay __9"></div>
    </div>
    `;
    static elemento_jquery_nave = `
    <div class="ship enemy">
        <img src="src/img/ship-enemy.png" alt="">
    </div>`

    static elemento_html_enemyArea;
    static elemento_html_enemyShipbay;

    static criar(arg) {
        $(".jogo").append(NaveInimiga.elemento_jquery_enemyArea);
        
        arg.toString().split('') > 1 ? single() : multiple();
        function single(){
            $(`.__${arg}`).append(NaveInimiga.elemento_jquery_nave)
        }
        function multiple(){
            NaveInimiga.selecionar()
            for (let inimigo = 0; inimigo <= arg.length - 1; inimigo++){
                $(`.__${arg[inimigo]}`).append(NaveInimiga.elemento_jquery_nave)
            }
        }
    }

    static selecionar() {
        this.elemento_html_enemyArea = $(".enemyArea")
        this.elemento_html_enemyShipbay = document.querySelectorAll(".shipBay")
    }
}