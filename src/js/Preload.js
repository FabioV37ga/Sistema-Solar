// Esse arquivo é responsável por carregar recursos do jogo anteriormente para evitar instabilidade
$("main").append($("<div>", { class: 'preload'}))
$(".preload").append($("<img>", { src: 'src/img/boom_1.png', style: 'opacity: 0' }))
$(".preload").append($("<img>", { src: 'src/img/boom_2.png', style: 'opacity: 0' }))
$(".preload").append($("<img>", { src: 'src/img/boom_3.png', style: 'opacity: 0' }))
$(".preload").append($("<img>", { src: 'src/img/boom_4.png', style: 'opacity: 0' }))
$(".preload").append($("<img>", { src: 'src/img/boom_5.png', style: 'opacity: 0' }))
$(".preload").append($("<img>", { src: 'src/img/boom_6.png', style: 'opacity: 0' }))
$(".preload").append($("<img>", { src: 'src/img/boom_7.png', style: 'opacity: 0' }))
$(".preload").append($("<img>", { src: 'src/img/boom_8.png', style: 'opacity: 0' }))

setTimeout(() => {
    $(".preload")[0].remove()
}, 100);
