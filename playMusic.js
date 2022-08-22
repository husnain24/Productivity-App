/**
 * Productivity App
 * Allows user to play/pause the select music they can see.
 * 
 * @Author Husnain Ahmad
 */


// Grab the music from the DOM.
const experienceAud = document.getElementById('experience');
const leJardinAud = document.getElementById('Le-Jardin');
const cellosAud = document.getElementById('2CELLOS');

/**
 * Called when the play/pause button of any music option in clicked.
 * Responsible for playing and pausing the music the user clicks.
 *  
 * @param {*} audioTitle = title of music the user clicks to play/pause.
 */
function playMusic(audioTitle) {
  let audioFile = null;
  let playPauseButton = null;

  // Get the specific play/pause button and music file the user clicked.
  if(audioTitle === 'experience') {
    audioFile = document.getElementById('experience');
    playPauseButton = document.getElementById('musicBtn1');
  }
  else if(audioTitle === 'jardin') {
    audioFile = document.getElementById('Le-Jardin');
    playPauseButton = document.getElementById('musicBtn2');
  }
  else {
    audioFile = document.getElementById('2CELLOS');
    playPauseButton = document.getElementById('musicBtn3');
  }

  // Only play music and change play/pause button icon if nothing is playing.
  if (experienceAud.paused && leJardinAud.paused && cellosAud.paused) {
    audioFile.play();
    playPauseButton.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
  } else {
    audioFile.pause();
    audioFile.currentTime = 0
    playPauseButton.innerHTML = '<i class="fa-solid fa-play"></i>';
  }
}