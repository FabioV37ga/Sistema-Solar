// Esse arquivo é responsável por carregar recursos do jogo anteriormente para evitar instabilidade
$("main").append($("<div>", { class: 'preload' , style: 'height: 1px; position: absolute; margin-left: -1000000px'}))
console.log(`[#PRELOAD] iniciado`)

for (let i = 1; i <= 8; i++) {
    // imagens de explosão
    $(".preload").append($("<img>", { src: `src/img/boom_${i}.png`, class: "boom" }))
    console.log(`[#PRELOAD] Image: boom_${i}.png ✅`)
}
{
    $(".preload").append($("<audio>", { src: `src/sound/boom.wav`, volume: '0', class: "pre_audio" }))
    $(".preload").append($("<audio>", { src: `src/sound/button-click.mp3`, volume: '0', class: "pre_audio" }))
    $(".preload").append($("<audio>", { src: `src/sound/button-hover.mp3`, volume: '0', class: "pre_audio" }))
    $(".preload").append($("<audio>", { src: `src/sound/button-out.mp3`, volume: '0', class: "pre_audio" }))
    $(".preload").append($("<audio>", { src: `src/sound/shoot.mp3`, volume: '0', class: "pre_audio" }))

    for (let i = 0; i < $(".pre_audio").length - 1; i++) {
        var ambiente = window.location.href == 'https://fabiov37ga.github.io/Sistema-Solar/' ? 6 : 12;
        console.log(`[#PRELOAD] Audio: ${$(".pre_audio")[i].src.toString().split("/")[ambiente]}✅`)
    }
}



if ($(".boom").length == 8 && $(".pre_audio").length == 5) {
    setTimeout(() => {
        console.clear()
        console.log(`[#PRELOAD] Concluído ✅`)
    }, 2000);
    setTimeout(() => {
        // $(".preload")[0].remove()
    }, 100);
}
