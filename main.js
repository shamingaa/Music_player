const playButton = document.querySelector(".mainButton");
const audio = document.querySelector("audio");
const timeline = document.querySelector(".timeline");
const monitor = document.querySelector(".monitor");
const musicTitle = document.getElementById("musicTitle");
const musicArtiste = document.getElementById("musicArtiste");
const volumeMonitor = document.querySelector(".volumeMonitor");

const soundButton = document.querySelector(".soundButton");
const increaseVolume = document.getElementById("increaseVolume");
const decreaseVolume = document.getElementById("decreaseVolume");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("prev");

// ========== Handle volume Decrease ===================
decreaseVolume.addEventListener("click", () => {
  if (audio.volume == 1.3877787807814457e-16) {
    return;
  } else {
    audio.volume -= 0.1;
    let volumePercent = Math.floor(audio.volume * 100);
    volumeMonitor.innerHTML = `${volumePercent}%`
  }
});

// ========== Handle volume Increase ===================
increaseVolume.addEventListener("click", () => {
  if (audio.volume == 1) {
    return;
  } else {
    audio.volume += 0.1;
    let volumePercent = Math.floor(audio.volume * 100);
    volumeMonitor.innerHTML = `${volumePercent}%`
  }
});

const track = { value: 0 };

// ========== All Songs ==============
const songs = [
  { url: "aud/song1.aac", artiste: "Runtown", title: "Happen for Lagos" },
  { url: "aud/song2.aac", artiste: "Harry Styles", title: "As it was" },
];

currentSong(track.value);

// ========= Handle The current song ==================
function currentSong(n) {
  const { url, artiste, title } = songs[n];
  audio.src = `${url}`;
  musicTitle.innerText = title;
  musicArtiste.innerText = artiste;
}

// ========= Handle Next track ==================
function nextTrack() {
  if (track.value == songs.length - 1) {
    track.value = 0;
    musicPaused();
    audio.autoplay = true;
    currentSong(track.value);
    musicPlaying();
  } else {
    track.value += 1;
    musicPaused();
    audio.autoplay = true;
    currentSong(track.value);
    musicPlaying();
  }
}
nextButton.addEventListener("click", nextTrack);

// ========= Handle Next track ==================
function previousTrack() {
  if (track.value == 0) {
    track.value = 0;
    musicPaused();
    audio.autoplay = true;
    currentSong(track.value);
    musicPlaying();
  } else {
    track.value -= 1;
    musicPaused();
    audio.autoplay = true;
    currentSong(track.value);
    musicPlaying();
  }
}
previousButton.addEventListener("click", previousTrack);

// =============== Play Function ==========================
function musicPlaying() {
  playButton.innerHTML = `<img src="./img/pause.png" alt="">`;

  monitor.innerHTML = "";

  const img = document.createElement("img");
  img.id = "audioWave";
  img.src = "./img/waveMove.gif";
  monitor.append(img);
}

// =============== Paused Function ================================
function musicPaused() {
  playButton.innerHTML = `<img src="./img/play.png" alt="">`;
  monitor.innerHTML = "";

  const img = document.createElement("img");
  img.id = "audioWave";
  img.src = "./img/waveIcon.png";

  monitor.append(img);
}

// ---------- Function to toggle betweem play and pause -------------------------
function toggleAudio() {
  if (audio.paused) {
    audio.play();
    musicPlaying();
  } else {
    audio.pause();
    musicPaused();
  }
}
playButton.addEventListener("click", toggleAudio);

// ---------- Change the icon of playButton back to default -------------------
audio.onended = nextTrack;

// ------------ Handle Timeline --------------------------------------
function changeTimelinePosition() {
  const percentagePosition = (100 * audio.currentTime) / audio.duration;
  timeline.style.backgroundSize = `${percentagePosition}% 100%`;
  timeline.value = percentagePosition;
}
audio.ontimeupdate = changeTimelinePosition;

// ------------- Handle Mute and Unmute----------------------------------
function toggleSound() {
  audio.muted = !audio.muted;
  soundButton.innerHTML = audio.muted
    ? `<img src="./img/mute.png" alt="volume icon" id="volumeIcon" />`
    : `<img src="./img/volume.png" alt="volume icon" id="volumeIcon" />`;
}

soundButton.addEventListener("click", toggleSound);

// ---------------- Handle volume increase -----------------------
