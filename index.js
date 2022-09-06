const wrapper = document.querySelector(".wrapper"),
    searchBtn = wrapper.querySelector(".search"),
    listBtn = wrapper.querySelector(".list"),
    musicImg = wrapper.querySelector("img"),
    musicName = wrapper.querySelector(".name"),
    musicArtist = wrapper.querySelector(".artist"),
    progressArea = wrapper.querySelector(".progress-area"),
    progressBar = progressArea.querySelector(".progress-bar"),
    mainSong = wrapper.querySelector("#main-song"),
    playPauseBtn = wrapper.querySelector(".play-pause"),
    prevBtn = wrapper.querySelector(".prev"),
    nextBtn = wrapper.querySelector(".next");

let musicIndex = Math.floor(Math.random() * allMusic.length);
let isMusicPaused = true;

window.addEventListener("load", () => {
    loadMusic(musicIndex);
});

function loadMusic(index) {
    musicName.innerText = allMusic[index].name;
    musicArtist.innerText = allMusic[index].artist;
    musicImg.src = `img/${allMusic[index].img}.jpg`;
    mainSong.src = `songs/${allMusic[index].src}.mp3`;
}

function playMusic() {
    wrapper.classList.add("played");
    musicImg.classList.add("rotate");
    playPauseBtn.innerHTML = `<i class="fi fi-sr-pause"></i>`;
    mainSong.play();
}

function pauseMusic() {
    wrapper.classList.remove("played");
    musicImg.classList.remove("rotate");
    playPauseBtn.innerHTML = `<i class="fi fi-sr-play"></i>`;
    mainSong.pause();
}

function prevMusic() {
    musicIndex--;
    musicIndex = musicIndex < 0 ? allMusic.length - 1 : musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

function nextMusic() {
    musicIndex++;
    musicIndex = musicIndex == allMusic.length ? 0 : musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

playPauseBtn.addEventListener("click", () => {
    const isMusicPlay = wrapper.classList.contains("played");
    isMusicPlay ? pauseMusic() : playMusic();
});

prevBtn.addEventListener("click", () => {
    prevMusic();
});

nextBtn.addEventListener("click", () => {
    nextMusic();
});

mainSong.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    const progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = wrapper.querySelector(".current-time");
    let musicDuration = wrapper.querySelector(".duration");
    mainSong.addEventListener("loadeddata", () => {
        let mainDuration = mainSong.duration;
        let totalMin = Math.floor(mainDuration / 60);
        let totalSec = Math.floor(mainDuration % 60);
        if (totalSec < 10) {
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;
    });

    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

progressArea.addEventListener("click", (e) => {
    let progressWidth = progressArea.clientWidth;
    let clickedOffsetX = e.offsetX;
    let songDuration = mainSong.duration;

    mainSong.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    playMusic();
});

mainSong.addEventListener("ended", () => {
    nextMusic();
});