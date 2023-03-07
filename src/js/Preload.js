// Esse arquivo é responsável por carregar recursos do jogo anteriormente para evitar instabilidade
$("main").append($("<div>", { class: 'preload'}))
console.log(`[#PRELOAD] iniciado`)   

for(let i = 1; i <= 8; i++){
    // imagens de explosão
    $(".preload").append($("<img>", { src: `src/img/boom_${i}.png`, style: 'opacity: 0', class: "boom"})) 
    console.log(`[#PRELOAD] ${i} ✅`)
}

if($(".boom").length == 8){
    setTimeout(() => {
        console.clear()
        console.log(`[#PRELOAD] Concluído ✅`)
    }, 2000);
    setTimeout(() => {
        $(".preload")[0].remove()
    }, 100);
}
