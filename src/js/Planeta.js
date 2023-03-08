class Planeta {
    static planetas = `
    [
        {
            "id": 1,
            "nome": "mercurio",
            "tamanho": "nullkm",
            "texto": "Baita planeta. nota 6"
        },
        {
            "id": 2,
            "nome": "venus",
            "tamanho": "nullkm",
            "texto": "Baita planeta. nota 6"
        },
        {
            "id": 3,
            "nome": "terra",
            "tamanho": "nullkm",
            "texto": "Baita planeta. nota 6"
        }
    ]`

    static id;
    static nome;
    static tamanho;
    static texto;

    static criar(faseAtual) {
        const planeta = JSON.parse(Planeta.planetas)
        var planetaAtual = planeta.find(planeta => planeta.id === faseAtual)
        // Planeta.nome = nome;
        // Planeta.tamanho = tamanho;
        // Planeta.texto = texto;

        $(".jogo").append(`
        <div class="planetarea">
            <div class="planeta">
                <img src="src/planetas/outro/${planetaAtual.id}_${planetaAtual.nome}.svg">
            </div>
            <div class="planeta-info">
                <div class="info">
                    <div class="info-pointer">
                        <div class="pointer-circle"></div>
                        <div class="pointer-arrow"></div>
                    </div>
                    <div class="info-box">
                        <h1 class="info-title">${planetaAtual.nome}</h1>
                        <div class="info-size">Tamanho: <br> ${planetaAtual.tamanho}</div>
                        <div class="info-text">
                            <h1>Informacoes Gerais</h1>
                            <p>${planetaAtual.texto}
                            </p>
                        </div>
                        <button class="info-continuar">Continuar</button>
                    </div>
                </div>
            </div>
        </div>
        `)
    }

    static mostrar() {
        $(".planeta")[0].children[0].addEventListener("animationend", () => {
            $(".planeta")[0].children[0].style.marginLeft = "-90px"
            this.controlar()
        })
        $(".planeta")[0].children[0].classList.add("in")
    }

    static controlar() {
        // TODO: Esse método vai 1. criar botão analizar, 2. mostrar caixas de texto, 3. permitir avanço de fase
        // TODO: Limpar eventlister depois do primeiro uso
        console.log("controlar")
        document.querySelector("body").addEventListener("keydown", function (e) {
            console.log("controlar1")
            if (e.keyCode == 80) {
                console.log("controlar2")
                document.querySelector(".planetarea").remove()
                Jogo.avancarFase()
            }
        })
    }

}