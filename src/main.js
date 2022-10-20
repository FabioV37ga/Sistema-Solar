// Planeta.testa()
var planeta = document.querySelectorAll(".planeta-container");
var distancia = screen.width + 800
planeta[0].style.marginLeft = distancia+'px';
var corpo = document.getElementsByTagName("body")

var intervalo = setInterval(() => {
    distancia -= 10
    planeta[0].style.marginLeft = distancia+'px';
    if (distancia == 0){
        clearInterval(intervalo)
    }
}, 1);


corpo[0].style = `background-position: ${distancia+screen.width}px`


