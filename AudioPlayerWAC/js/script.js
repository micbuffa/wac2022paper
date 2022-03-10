import dataAline from './networkData.js';
let player;

window.onload = init;

function init() {
     player = document.querySelector("#myPlayer");
}

function playAlbum() {
    player.play(dataAline.groupedItems.find(d => d.artist === "Queen" && d.type === "album"));
}