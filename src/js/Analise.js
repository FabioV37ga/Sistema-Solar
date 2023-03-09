class Analise {
    static criar(tipo) {
        if (tipo == 1) {
            var botaoAnalise =
                `
            <div class="analisar">
                        <p>Aperte</p>
                        <img src="src/img/espaco_verde.png" alt="">
                        <p>para analisar <br> o planeta.</p>
                    </div>
            `
            $(".planetarea").prepend(botaoAnalise)
            Analise.controlar(1)
        } else {
            var barraAnalise = $("<div></div>", { class: "barra-analise" })
            $(".jogo").prepend(barraAnalise)
            Analise.controlar(2)

        }
    }

    static controlar(tipo) {

        if (tipo == 1) {
            function keyHandle(e) {
                if (e.keyCode == 32) {
                    $(".analisar")[0].remove()
                    Analise.criar(2)
                    document.querySelector("body").removeEventListener("keydown", keyHandle)
                }
            }
            document.querySelector("body").addEventListener("keydown", keyHandle)

        } else {
            console.log(`[#${Jogo.faseAtual}] Analise iniciada`)
            function animationHandle() {
                Planeta.criar(2)
                document.querySelector(".barra-analise").removeEventListener("animationend", animationHandle)
                $(".barra-analise")[0].remove()
                
                setTimeout(() => {
                    Planeta.controlar()
                }, 500);

            }
            document.querySelector(".barra-analise").addEventListener("animationend", animationHandle)
        }
    }

    static apagar() {
        var barra = document.querySelector(".barra-analise");
        barra.addEventListener("animationend", () => {
            barra.remove()
        })
    }
}