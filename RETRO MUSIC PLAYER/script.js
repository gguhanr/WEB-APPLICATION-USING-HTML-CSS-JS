const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const pauseBtn = document.getElementById('pause');
const stopBtn = document.getElementById('stop');
const volumeSlider = document.getElementById('volume');
const progressSlider = document.getElementById('progress');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');
const reelLeft = document.getElementById('reel-left');
const reelRight = document.getElementById('reel-right');
const equalizer = document.getElementById('equalizer');

let isPlaying = false;

playBtn.onclick = () => {
  audio.play();
};

pauseBtn.onclick = () => {
  audio.pause();
};

stopBtn.onclick = () => {
  audio.pause();
  audio.currentTime = 0;
};

volumeSlider.oninput = () => {
  audio.volume = volumeSlider.value;
};

audio.onloadedmetadata = () => {
  durationDisplay.textContent = formatTime(audio.duration);
};

audio.ontimeupdate = () => {
  progressSlider.value = (audio.currentTime / audio.duration) * 100 || 0;
  currentTimeDisplay.textContent = formatTime(audio.currentTime);
};

progressSlider.oninput = () => {
  const time = (progressSlider.value / 100) * audio.duration;
  audio.currentTime = time;
};

audio.onplay = () => {
  reelLeft.classList.add('spin');
  reelRight.classList.add('spin');
  equalizer.classList.add('playing');
  isPlaying = true;
};

audio.onpause = () => {
  reelLeft.classList.remove('spin');
  reelRight.classList.remove('spin');
  equalizer.classList.remove('playing');
  isPlaying = false;
};

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${min}:${sec}`;
}
