var planeta = 1
var planetas = document.querySelectorAll(".planeta")

document.querySelector(".planetas").children[0].classList.add("atual")

document.querySelectorAll("button")[0].addEventListener("click", () => {
    if (planeta > 1) {
        console.log("Movendo planeta " + planeta + " para a direita (posteriores).")
            planetas[planeta-1].classList.add("posterior")
            planetas[planeta-1].classList.remove("atual")
        planeta--
        console.log("Movendo planeta " + planeta + " para a direita (atual)")
        planetas[planeta-1].classList.add("atual")
        planetas[planeta-1].classList.remove("anterior")

    } else {
        console.log("Não há mais planetas para voltar.")
    }
})

document.querySelectorAll("button")[1].addEventListener("click", () => {
    if (planeta < 8) {
        console.log("Movendo o planeta " + planeta + " para a esquerda (anteriores)")
            planetas[planeta-1].classList.remove("atual")
            planetas[planeta-1].classList.add("anterior")
        planeta++
        console.log("Movendo planeta " + planeta + " para a esquerda (atual)")
        planetas[planeta-1].classList.remove("posterior")
        planetas[planeta-1].classList.add("atual")





    } else {
        console.log("Não há mais planetas para ir.")
    }
})