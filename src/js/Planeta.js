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
            "nome": "Mercúrio",
            "tamanho": "4.879,4 km",
            "texto": "É o menor planeta do Sistema Solar. Apresenta corpo rochoso. Um dia em Mercúrio dura 59 dias na Terra, um ano dura 88 dias na Terra. Não possui satélites naturais. Núcleo formado predominantemente de ferro. Mesmo tão próximo do Sol, sondas encontraram gelo em Mercúrio."
        },
        {
            "id": 2,
            "nome": "Vênus",
            "tamanho": "12.104 km",
            "texto": "Sua atmosfera é composta de dióxido de carbono. Não há placas tectônicas ativas em Vênus, e seu dia dura cerca de 243 dias na terra. Vênus é o planeta mais quente do Sistema Solar, com uma temperatura de superfície que pode chegar a 462 graus."
        },
        {
            "id": 3,
            "nome": "Terra",
            "tamanho": "12.742 km",
            "texto": "Casa. Tudo o que conhecemos como vida está aqui. É o maior dos planetas rochosos do Sistema Solar. É composto principalmente de rochas e minerais, além de água e ar. O núcleo é principalmente de ferro. Sua atmosfera é cerca 78% de nitrogênio e 21% de oxigênio."
        },
        {
            "id": 4,
            "nome": "Marte",
            "tamanho": "6.779 km",
            "texto": "Sua superfície é coberta por crateras, montanhas e vales. Composto principalmente de rochas e óxidos metálicos, como ferro e magnésio. Acredita-se que seu núcleo é de níquel e ferro. Além da terra, é o único planeta que apresenta estações climáticas diferentes em um ano. Seu dia dura 39 minutos a mais que a terra."
        },
        {
            "id": 5,
            "nome": "Júpiter",
            "tamanho": "139.820 km",
            "texto": "Cabem cerca de 1320 planetas Terra em Júpiter. É composto principalmente de hidrogênio e hélio. Acredita-se que seu núcleo seja composto de rocha, gelo e metais pesados. Possui diversas luas e um sistema de anéis. Existe um furacão maior do que a Terra em júpiter que está ativo a mais de 300 anos. Um dia aqui equivale 9h56m na terra."
        },
        {
            "id": 6,
            "nome": "Saturno",
            "tamanho": "116.460 km",
            "texto": "Famoso por seus anéis brilhantes. Composto principalmente de hidrogênio e hélio. Saturno é o planeta menos denso do sistema solar, se houvesse um oceano grande suficiente para colocá-lo, ele flutuaria. Seus anéis possuem gelo e rocha maiores que edifícios. Um dia em saturno equivale 10 horas e 40 minutos na terra."
        },
        {
            "id": 7,
            "nome": "Urano",
            "tamanho": "50.724 km",
            "texto": "Gigante de gás e gelo. Composto de hidrogênio e hélio, um pouco de metano e outros gases. Acredita-se que o núcleo seja composto de rochas e envolvido por água, amônia e metano. Possui estações climáticas que duram cerca de 21 anos cada. Um dia em Urano dura cerca de 17 horas e 14 minutos na Terra."
        },
        {
            "id": 8,
            "nome": "Netuno",
            "tamanho": "49.244 km",
            "texto": "Localizado na região externa do sistema solar. Composição parecida com urano. Acredita-se que o núcleo seja composto de rochas, gelo e metais pesados. Ventos em saturno podem chegar em até 2.000km/h. Possui uma lua chamada Tritão, que é coberta de gelo e tem vulcões ativos. Um dia em Netuno dura cerca de 16 horas e 6 minutos na Terra."
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

        var nomeFormatado = planetaAtual.nome.toString().toLowerCase().replace("ú", "u").replace("ê", "e")

        if (parte == 1) {
            $(".jogo").append(`
                <div class="planetarea">
                    <div class="planeta">
                        <img src="src/planetas/outro/${planetaAtual.id}_${nomeFormatado}.svg">
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
                                <h1>Informações Gerais</h1>
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