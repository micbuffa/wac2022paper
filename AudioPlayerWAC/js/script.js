import {dataAline} from './networkData.js';
let player;

console.log(dataAline)

window.onload = init;

function init() {
    player = document.querySelector("#myPlayer");

    document.querySelector('#playDiscography').onclick = playDiscography
    document.querySelector('#playAlbum').onclick = playAlbum
    document.querySelector('#playSong').onclick = playSong
}

function playAlbum() {
    player.play(dataAline.groupedItems.find(d => d.artist === "Queen" && d.type === "album"));
}

function playDiscography() {
    player.play({type: 'discography', artist: 'Queen'})
}

function playSong() {
    player.play(dataAline.groupedItems.find(d => d.type === 'album' && d.artist === 'Queen').children[0])
}