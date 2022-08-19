const experienceAud = document.getElementById('experience');
const leJardinAud = document.getElementById('Le-Jardin');
const cellosAud = document.getElementById('2CELLOS');

// const playBtn1 = document.getElementById('play-btn1');
// const playBtn2 = document.getElementById('play-btn2');
// const playBtn3 = document.getElementById('play-btn3');

// playBtn1.addEventListener('click', clickPlay);
// playBtn3.addEventListener('click', clickPlay);
// playBtn3.addEventListener('click', clickPlay);

const musicContainer = document.querySelector('.music-container')

// musicContainer.addEventListener('click', clickPlay)

const playing = false;

// function clickPlay(event) {
//   event.preventDefault();
//   // if(!experienceAud.paused || !leJardinAud.paused || !cellosAud.paused)
//   //   return;
//   const clicked = event.target;
//   const pausePlayButton = clicked.parentElement.querySelectorAll('button')[0];
//   const audioTitle = clicked.parentElement.querySelectorAll('span')[0].innerText;
//   let audioFile = null;
//   if(audioTitle === 'Ludovico Einaudi - Experience')
//     audioFile = document.getElementById('experience');
//   else if(audioTitle === 'Stephan Moccio - Le Jardin de Monsieur Monet')
//     audioFile = document.getElementById('Le-Jardin');
//   else {
//     audioFile = document.getElementById('2CELLOS');
//   }
//   console.log(pausePlayButton)
//   // console.log(clicked)
//   // console.log(clicked.parentElement.id);
//   // console.log(clicked.parentElement.querySelectorAll('span')[0])
//   if(playing) {
//     pausePlayButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
//     // playing = false;
//   } else {
//     pausePlayButton.innerHTML = '<i class="fa-solid fa-play"></i>';
//   }
//   if (audioFile.paused) {
//     audioFile.play();
//   }else{
//     audioFile.pause();
//     audioFile.currentTime = 0
//   }
// }

// const playingCurrently = {
//   'first': false,
//   'second': true,
//   'third': false
// }

const playingRn = [false, false, false];

// let playingRn = false;

function playMusic(audioTitle) {
  let audioFile = null;
  let playPauseButton = null;
  let index = null;
  if(audioTitle === 'experience') {
    audioFile = document.getElementById('experience');
    playPauseButton = document.getElementById('musicBtn1');
    index = 0;
  }
  else if(audioTitle === 'jardin') {
    audioFile = document.getElementById('Le-Jardin');
    playPauseButton = document.getElementById('musicBtn2');
    index = 1;
  }
  else {
    audioFile = document.getElementById('2CELLOS');
    playPauseButton = document.getElementById('musicBtn3');
    index = 2;
  }

  if (experienceAud.paused && leJardinAud.paused && cellosAud.paused) {
    audioFile.play();
    playPauseButton.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
    // playing[index] = true;
    // playingRn = true;
  }else{
    audioFile.pause();
    audioFile.currentTime = 0
    playPauseButton.innerHTML = '<i class="fa-solid fa-play"></i>';
    // playingRn[index] = false;
    // playingRn = false;
  }

  // if(!audioFile.playing) {
  //   playPauseButton.innerHTML = '<i class="fa-solid fa-pause';
  // } else {
  //   playPauseButton.innerHTML = '<i class="fa-solid fa-play';
  // }
}

// console.log(Object.values(playingCurrently))
// console.log(playingMusic(playingCurrently))
console.log(playingMusic(playingRn))

function playingMusic(playingCurrently) {
  return playingCurrently[0] || playingCurrently[1] || playingCurrently[2]
}