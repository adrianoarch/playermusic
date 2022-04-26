// Selecionando todos as tags ou elementos base para o player
const wrapper = document.querySelector(".wrapper");
musicImg = wrapper.querySelector(".img-area img");
musicName = wrapper.querySelector(".song-details .name");
musicArtist = wrapper.querySelector(".song-details .artist");
mainAudio = wrapper.querySelector("#main-audio");
playPauseBtn = wrapper.querySelector(".play-pause");
// musicProgress = wrapper.querySelector(".progress");

let musicIndex = 2;

//Chama a função para carregar a musica quando a janela for carregada
window.addEventListener("load", () => {
    loadMusic(musicIndex);

})
//Função para carregar a musica
function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `./assets/images/${allMusic[indexNumb - 1].img}.jpg`;
    mainAudio.src = `./assets/mp3/${allMusic[indexNumb - 1].src}.mp3`;
}

//Função para dar Play
function playMusic() {
    wrapper.classList.add("paused");
    mainAudio.play();
}

//Ação para dar play e pause na musica
playPauseBtn.addEventListener("click", () => {
   const isMusicPaused = wrapper.classList.contains("paused");
   // Se a musica estiver pausada, então ela vai tocar
   isMusicPaused ? pauseMusic() : playMusic();
})