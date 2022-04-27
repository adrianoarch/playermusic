// Selecionando todos as tags ou elementos base para o player
const wrapper = document.querySelector(".wrapper");
musicImg = wrapper.querySelector(".img-area img");
musicName = wrapper.querySelector(".song-details .name");
musicArtist = wrapper.querySelector(".song-details .artist");
mainAudio = wrapper.querySelector("#main-audio");
playPauseBtn = wrapper.querySelector(".play-pause");
prevBtn = wrapper.querySelector("#prev");
nextBtn = wrapper.querySelector("#next");
progressBar = wrapper.querySelector(".progress-bar");
progressArea = wrapper.querySelector(".progress-area");


let musicIndex = 2;

//Chama a função para carregar a musica quando a janela for carregada
window.addEventListener("load", () => {
  loadMusic(musicIndex);
});
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
  playPauseBtn.querySelector("i").innerText = "pause";
  mainAudio.play();
}

//Função para dar Pause
function pauseMusic() {
  wrapper.classList.remove("paused");
  playPauseBtn.querySelector("i").innerText = "play_arrow";
  mainAudio.pause();
}

//Função para mudar para a musica seguinte
function nextMusic() {
  musicIndex++;
  //Se o index for maior que o tamanho do array, volta ao inicio
  if (musicIndex > allMusic.length) {
    musicIndex = 1;
  }
  loadMusic(musicIndex);
  playMusic();
}

//Função para mudar para a musica anterior
function prevMusic() {
  musicIndex--;
  //Se o index for menor que 1, volta ao fim do array
  if (musicIndex < 1) {
    musicIndex = allMusic.length;
  }
  loadMusic(musicIndex);
  playMusic();
}

//Ação para dar play e pause na musica
playPauseBtn.addEventListener("click", () => {
  const isMusicPaused = wrapper.classList.contains("paused");
  // Se a musica estiver pausada, então ela vai tocar
  isMusicPaused ? pauseMusic() : playMusic();
});

//Ação para mudar para a música seguinte
nextBtn.addEventListener("click", () => {
  nextMusic(); // Função para mudar para a música seguinte
});

//Ação para mudar para a musica anterior
prevBtn.addEventListener("click", () => {
  prevMusic(); // Função para mudar para a música anterior
});

//Atualiza o progresso da musica na barra de progresso
mainAudio.addEventListener("timeupdate", () => {
  const totalTime = mainAudio.duration; // Pegando o tempo total da musica
  const currentTime = mainAudio.currentTime; // Pegando o tempo atual da música
  let progressWidth = (currentTime / totalTime) * 100;
  progressBar.style.width = `${progressWidth}%`;

  let musicCurrentTime = wrapper.querySelector(".current");
  musicDuration = wrapper.querySelector(".duration");

  mainAudio.addEventListener("loadeddata", () => {
    //Atualiza o tempo total da musica
    let audioDuration = mainAudio.duration;
    let totalMinutes = Math.floor(audioDuration / 60);
    let totalSeconds = Math.floor(audioDuration % 60);
    if (totalSeconds < 10) {
      //Adiocionando 0 caso os segundos sejam menor que 10
      totalSeconds = `0${totalSeconds}`;
    }
    musicDuration.innerText = `${totalMinutes}:${totalSeconds}`;
  });
  //Atualiza o tempo atual da musica
  let currentMinutes = Math.floor(currentTime / 60);
  let currentSeconds = Math.floor(currentTime % 60);
  if (currentSeconds < 10) {
    //Adiocionando 0 caso os segundos sejam menor que 10
    currentSeconds = `0${currentSeconds}`;
  }
  musicCurrentTime.innerText = `${currentMinutes}:${currentSeconds}`;
});

//Atualiza o progresso da musica na barra de progresso
progressArea.addEventListener("click", e => {
  let progressWidthVal = progressArea.clientWidth; // Pegando o valor da largura da barra de progresso
    let progressClicked = e.offsetX; // Pegando o valor do clique na barra de progresso
   let songDuration = mainAudio.duration; // Pegando o tempo total da musica
    mainAudio.currentTime = (progressClicked / progressWidthVal) * songDuration;
    playMusic();
});

//Trabalhando a repetição e aleatoriedade da música
const repeatBtn = wrapper.querySelector("#repeat-plist");

repeatBtn.addEventListener("click", () => {
    let getText = repeatBtn.innerText;
    if (getText === "repeat") {
        repeatBtn.innerText = "repeat_one";
        repeatBtn.setAttribute("title", "Música repetida");
        } else if (getText === "repeat_one") {
            repeatBtn.innerText = "shuffle";
        repeatBtn.setAttribute("title", "Músicas aleatórias");
            }
        else if (getText === "shuffle") {
            repeatBtn.innerText = "repeat";
        repeatBtn.setAttribute("title", "Lista em loop");
            }
});

mainAudio.addEventListener("ended", () => {
    if (repeatBtn.innerText === "repeat") {
        loadMusic(musicIndex);
        playMusic();
    } else if (repeatBtn.innerText === "repeat_one") {
        musicIndex = musicIndex - 1;
        loadMusic(musicIndex);
        playMusic();
    } else if (repeatBtn.innerText === "shuffle") {
        musicIndex = Math.floor(Math.random() * allMusic.length) + 1;
        loadMusic(musicIndex);
        playMusic();
    }
});