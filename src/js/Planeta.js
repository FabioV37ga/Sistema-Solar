class Planeta {
    static planetas = `
    [
        {
            "id": 1,
            "nome": "mercurio",
            "tamanho": "null km",
            "texto": "Baita planeta. nota 6"
        },
        {
            "id": 2,
            "nome": "venus",
            "tamanho": "null km",
            "texto": "Baita planeta. nota 6"
        },
        {
            "id": 3,
            "nome": "terra",
            "tamanho": "null km",
            "texto": "Baita planeta. nota 6"
        },
        {
            "id": 4,
            "nome": "marte",
            "tamanho": "null km",
            "texto": "Baita planeta. nota 6"
        },
        {
            "id": 5,
            "nome": "jupiter",
            "tamanho": "null km",
            "texto": "Baita planeta. nota 6"
        },
        {
            "id": 6,
            "nome": "saturno",
            "tamanho": "null km",
            "texto": "Baita planeta. nota 6"
        },
        {
            "id": 7,
            "nome": "urano",
            "tamanho": "null km",
            "texto": "Baita planeta. nota 6"
        },
        {
            "id": 8,
            "nome": "netuno",
            "tamanho": "null km",
            "texto": "Baita planeta. nota 6"
        }
    ]`

    static id;
    static nome;
    static tamanho;
    static texto;

    static criar(faseAtual, parte) {
        const planeta = JSON.parse(Planeta.planetas)
        var planetaAtual = planeta.find(planeta => planeta.id === faseAtual)
        console.log(planetaAtual)
        // Planeta.nome = nome;
        // Planeta.tamanho = tamanho;
        // Planeta.texto = texto;
        if (parte == 1) {
            $(".jogo").append(`
                <div class="planetarea">
                    <div class="planeta">
                        <img src="src/planetas/outro/${planetaAtual.id}_${planetaAtual.nome}.svg">
                    </div>
                </div>
             `)
        } else {
            $(".planetarea").append(`
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
            `)
        }
    }

    static mostrar() {
        $(".planeta")[0].children[0].addEventListener("animationend", () => {
            $(".planeta")[0].children[0].style.marginLeft = "-90px"
            Analise.criar(1)
            // this.criar(Jogo.faseAtual, 2)
            // this.controlar()
        })
        $(".planeta")[0].children[0].classList.add("in")
    }

    static controlar() {
        // TODO: Esse método vai 1. criar botão analizar, 2. mostrar caixas de texto, 3. permitir avanço de fase
        // TODO: Limpar eventlister depois do primeiro uso
        document.querySelector(".info-continuar").addEventListener("click", () => {
            $(".pointer-circle")[0].classList.add("close-circle")
            $(".pointer-arrow")[0].classList.add("close-arrow")
            $(".info-box")[0].classList.add("close-box")
            $(".info-box")[0].children[0].style = "opacity: 0"
            $(".info-box")[0].children[1].style = "opacity: 0"
            $(".info-box")[0].children[2].style = "opacity: 0"
            $(".info-continuar")[0].style = "opacity: 0"
        })

        function animationHandle() {
            console.log("apagar e proximo")
            document.querySelector(".planeta-info").remove()
            Planeta.esconder()
        }
        document.querySelector(".pointer-circle").addEventListener("animationend", animationHandle)
    }
    
    static esconder() {
        Fase.progressao = 1
        Jogo.viajar()
        var margin = -90
        var intervalo = setInterval(() => {
            margin--
            document.querySelector(".planeta").children[0].style = `margin-left: ${margin}px`
            if (margin == -540){
                clearInterval(intervalo)
                Jogo.avancarFase()
                document.querySelector(".planetarea").remove()
            }
        }, 1);
    }
}