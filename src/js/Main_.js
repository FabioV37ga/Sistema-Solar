var documento = document;

function handleKeydown(e){

    document.querySelector("#comecar").remove()
    Janela.criar()
    Inicio.criar()

    window.audio = new Audio('src/sound/soundtrack.mp3');
    window.audio.play();
    window.audio.volume = 0.05
    window.audioStatus = 1
    
    audio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
      });

    documento.removeEventListener('keydown', handleKeydown);
}

document.addEventListener("keydown", handleKeydown);