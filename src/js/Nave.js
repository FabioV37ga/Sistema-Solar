class Nave {
    static elemento_jquery = `
    <div class = "ship ally"><img src="src/img/ship-ally.png" alt=""></div>
    `;
    static elemento_html_playArea;
    static elemento_html_nave;

    static criar() {
        $(".playarea").append(this.elemento_jquery);
        this.selecionar();
    }

    static selecionar() {
        this.elemento_html_nave = document.querySelector(".ally");
        this.controlar();
    }

    static controlar() {
        this.elemento_html_nave.addEventListener("animationend", () => {
            Jogo.iniciar()
        });
    }

    static liberar() {
        console.log("liber")
        var janela = document.querySelector("body")
        const upCode = 38;
        const downCode = 40;
        const leftCode = 37;
        const rightCode = 39;
        var _top = 0;
        var moveStateY;
        var _left = 209;
        var moveStateX;

        janela.addEventListener("keydown", function (direcao_y) {
            if (moveStateY == 0 || moveStateY == null) {
                if (direcao_y.keyCode == upCode) {
                    move_y("up");
                    moveStateY = 1
                } else if (direcao_y.keyCode == downCode) {
                    move_y("down");
                    moveStateY = 1
                }
            }
        })

        janela.addEventListener("keydown", function (direcao_x) {
            if (moveStateX == 0 || moveStateX == null) {
                if (direcao_x.keyCode == leftCode) {
                    move_x("left")
                    moveStateX = 1
                } else if (direcao_x.keyCode == rightCode) {
                    if (_left == 232 - 21) {
                        moverFundo(1);
                    }
                    move_x("right")
                    moveStateX = 1
                }
            }


        })


        function move_y(arg) {
            var intervalo = setInterval(() => {
                if (moveStateY == 1) {
                    switch (arg) {
                        case "up":
                            if (_top > -211)
                                _top--;
                            Nave.elemento_html_nave.style.top = _top + "px"
                            break;
                        case "down":
                            if (_top < 211)
                                _top++;
                            Nave.elemento_html_nave.style.top = _top + "px"

                            break;
                    }
                } else {
                    clearInterval(intervalo)
                }
            }, 5);
        }

        function move_x(arg) {
            var intervalo = setInterval(() => {
                if (moveStateX == 1) {
                    switch (arg) {
                        case "left":
                            if (_left >= 0)
                                _left--;
                            Nave.elemento_html_nave.style.left = _left + "px"
                            break;
                        case "right":
                            if (_left < 232 - 21) {
                                _left++;
                                Nave.elemento_html_nave.style.left = _left + "px"
                            }
                            if (_left == 232 - 21) {
                                console.log("movendo background -->")
                                moverFundo(1)
                            }
                            break;

                    }
                } else {
                    clearInterval(intervalo)
                }
            }, 5);
        }


        janela.addEventListener("keyup", function (direcao_x) {

            if (direcao_x.keyCode == rightCode ||
                direcao_x.keyCode == leftCode) {
                moveStateX = 0
            } if (_left == 232 - 21) {
                moverFundo(0)
            }
        })

        janela.addEventListener("keyup", function (direcao_y) {
            if (direcao_y.keyCode == upCode ||
                direcao_y.keyCode == downCode) {
                moveStateY = 0
            }
        })
        var backgroundState = 0;
        function moverFundo(arg) {
            if (arg == 1 && backgroundState == 0) {
                console.log("mov")
                backgroundState = 1;
                Janela.animar(2, "l")
            } else if (arg == 0) {
                backgroundState = 0
                window.pause = 1
            }
        }

    }
}