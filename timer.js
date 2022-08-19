const timeContainer = document.querySelector('.time-container');
const timeInput = document.querySelector('.time-input');
const startBtn = document.querySelector('#start');
const timeText = document.querySelector('.time');
const resetBtn = document.querySelector('#reset');

startBtn.addEventListener('click', getTimeInput);
resetBtn.addEventListener('click', reset);
let run = false;

function getTimeInput(event) {
  // Stop from page reloading when submitting
  event.preventDefault();
  // Get input from user
  let input = timeInput.value;
  // If empty, don't do anything.
  if(input == '' || run)
    return;
  run = true;
  startTime(Number(input));
  timeInput.value = '';
}

let intervalVar;

function startTime(input) {
  const timeRn = Date.now();
  // console.log(timeRn)
  const endTime = timeRn + (input * 60 * 1000);
  // console.log(timeRn, endTime)
  displayTime(Math.round(endTime - Date.now()) / 1000);
  intervalVar = setInterval(() => {
    const seconds = Math.round((endTime - Date.now()) / 1000);
    if(seconds < 0) {
      clearInterval(intervalVar);
      timeText.innerText = '--';
      document.getElementById('alarm').play();
      return;
    }
    displayTime(seconds);
    // console.log(seconds) 
  }, 1000);
}

function displayTime(seconds) {
  let hours = Math.floor(seconds / 60 / 60) + ':';
  if(hours == '0:')
    hours = '00:';
  let minutes = Math.floor(seconds / 60) % 60 < 10 ? '0' + Math.floor(seconds / 60) % 60 + ':': Math.floor(seconds / 60) % 60 + ':';
  if(minutes == '0:')
    minutes = '00:';
  let second = seconds % 60 < 10 ? '0' + seconds % 60 : seconds % 60;
  if(second == 0)
    seconds = '00';
  timeText.innerText = `${hours}${minutes}${second}`;
}

function reset(event) {
  // Stop from page reloading when submitting
  event.preventDefault();
  if(run) {
    clearInterval(intervalVar);
    run = false;
    timeText.innerText = '--';
  }
}

