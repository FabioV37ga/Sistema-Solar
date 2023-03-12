/*
Classe Planeta
    - Essa classe é responsável por criar, controlar, animar e apagar os elementos do planeta.
    - Também é responsável por criar, carregar e apagar aba de informações dos planetas.

Índice
    1. Atributos
        1.1 ID →
        1.2 Nome →
        1.3 Tamanho →
        1.4 Texto →
    2. Métodos
        2.1 criar(parte) →
            2.1.1 (1) →
            2.1.2 (2) →
        2.2 mostrar() →
        2.3 animar() →
        2.4 esconder() →
*/
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
        // Cria area e imagem do planeta
        if (parte == 1) {
            $(".jogo").append(`
                <div class="planetarea">
                    <div class="planeta">
                        <img src="src/planetas/outro/${planetaAtual.id}_${planetaAtual.nome}.svg">
                    </div>
                </div>
             `)
        }
        // Cria aba de informações do planeta
        else {
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

    // Depois que o planeta chega ao centro da tela, libera opção de scan (Analise.criar(1))
    static mostrar() {
        $(".planeta")[0].children[0].addEventListener("animationend", () => {
            $(".planeta")[0].children[0].style.marginLeft = "-90px"
            Analise.criar(1)
            // this.criar(Jogo.faseAtual, 2)
            // this.controlar()
        })
        $(".planeta")[0].children[0].classList.add("in")
    }

    // Controla o funcionamento do botão e suas interações
    static controlar() {
        // Quando o botão continuar for clicado, faz uma animação fechando a caixa de informações
        document.querySelector(".info-continuar").addEventListener("click", () => {
            $(".pointer-circle")[0].classList.add("close-circle")
            $(".pointer-arrow")[0].classList.add("close-arrow")
            $(".info-box")[0].classList.add("close-box")
            $(".info-box")[0].children[0].style = "opacity: 0"
            $(".info-box")[0].children[1].style = "opacity: 0"
            $(".info-box")[0].children[2].style = "opacity: 0"
            $(".info-continuar")[0].style = "opacity: 0"
        })

        // Quando a animação de fechar termina, apaga o elemento e move o planeta p/ esquerda com esconder().
        function animationHandle() {
            document.querySelector(".planeta-info").remove()
            Planeta.esconder()
        }
        document.querySelector(".pointer-circle").addEventListener("animationend", animationHandle)
    }

    // Usa um intervalo de 1ms para adicionar margin-left ao planeta até que ele suma da tela.
    // Quando sumir, avança a fase.
    static esconder() {
        Fase.progressao = 1
        Jogo.viajar()
        var margin = -90
        var intervalo = setInterval(() => {
            margin--
            document.querySelector(".planeta").children[0].style = `margin-left: ${margin}px`
            // Quando planeta sair de enquadramento...
            if (margin == -540) {
                // Para o loop
                clearInterval(intervalo)
                // Avança a fase
                Jogo.avancarFase()
                // Remove a sessão do planeta
                document.querySelector(".planetarea").remove()
            }
        }, 1);
    }
}