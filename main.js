const musicContainer = document.querySelector(".music-container");
const play = document.querySelector("#play");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector("#title");
const cover = document.querySelector(".cover");

const MAX = 15;

// Function to load a random song
function loadSong(index) {
  const link = `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${index}.mp3`;
  title.innerText = `Song number ${index}`;
  audio.src = link;
}
let index = Math.floor(Math.random() * MAX + 1);
loadSong(index);

// Functions to pause and play the current song
function pauseSong() {
  musicContainer.classList.remove("play");
  play.querySelector("i.fa").classList.remove("fa-pause");
  play.querySelector("i.fa").classList.add("fa-play");
  audio.pause();
}
function playSong() {
  musicContainer.classList.add("play");
  play.querySelector("i.fa").classList.remove("fa-play");
  play.querySelector("i.fa").classList.add("fa-pause");
  audio.play();
}

// Functions to play previous and next song
function prevSong() {
  index--;
  if (index < 1) index = MAX;
  loadSong(index);
  playSong();
}
function nextSong() {
  index++;
  if (index > MAX) index = 1;
  loadSong(index);
  playSong();
}

// Event for buttons
play.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) pauseSong();
  else playSong();
});
prev.addEventListener("click", prevSong);
next.addEventListener("click", nextSong);
audio.addEventListener("ended", nextSong);

// Event for updating progress
audio.addEventListener("timeupdate", (e) => {
  const { duration, currentTime } = e.srcElement;
  const percent = (currentTime / duration) * 100;
  progress.style.width = `${percent}%`;
});
progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const mouse = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (mouse / width) * duration;
});
