// Inicio da página
// Carrega soundtrack
window.audio = new Audio('src/sound/soundtrack.mp3');
var documento = document
// Função que força usuário a interagir com a página, dessa maneira permitindo o .play()
function handleKeydown(e) {
  if (e.keyCode == 32 || e.keyCode == 13) {
    document.querySelector("#comecar").remove()

    Janela.criar()
    Inicio.criar()
    window.audio.play();

    if (window.localStorage.getItem("soundtrack_volume") === null) {
      window.audio.volume = 0.05
    } else {
      window.audio.volume = window.localStorage.getItem("soundtrack_volume")
    }
    window.audioStatus = 1

    audio.addEventListener('ended', function () {
      this.currentTime = 0;
      this.play();
    });
    documento.removeEventListener('keydown', handleKeydown);
  }
}

documento.addEventListener("keydown", handleKeydown);