class Fase{
    static velocidade = 1;
    static avanco = 0;
    static janela;

    static animar(){
        Fase.janela = document.querySelector(".janela");
        var posicaoAtual_ = document.querySelector(".janela").style.backgroundPositionX.toString().replace("px","")
        var posicaoAtual = parseInt(posicaoAtual_)
        var intervalo = setInterval(() => {
            posicaoAtual -= this.velocidade;
            this.janela.style = `background-position-x: ${posicaoAtual}px;`
            console.log(this.avanco)
        }, 1);
    }

    static avancar(){

    }
}