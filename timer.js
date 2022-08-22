/**
 * Productivity App
 * This is responsible for displaying the time to the DOM so that the user
 * can easily set and start the timer.
 * 
 * @Author Husnain Ahmad
 */


const timeInput = document.querySelector('.time-input');
const startBtn = document.querySelector('#start');
const timeText = document.querySelector('.time');
const resetBtn = document.querySelector('#reset');

startBtn.addEventListener('click', getTimeInput);
resetBtn.addEventListener('click', reset);

let canRun = false;

/**
 * Get the number of minutes from the user to set timer.
 * @param {*} event 
 * @returns 
 */
function getTimeInput(event) {
  // Stop from page reloading when submitting
  event.preventDefault();
  // Get input from user
  let input = timeInput.value;
  // If empty or not a number, don't do anything.
  if(input == '' || isNaN(Number(input))) {
    timeInput.value = '';
    return;
  }
  canRun = true;
  startTime(Number(input));
  timeInput.value = '';
}


let intervalVar; // Holds the setInterval function

/**
 * Starts the process of displaying the timer given the user input.
 * @param {*} input 
 */
function startTime(input) {
  const timeRn = Date.now();
  const endTime = timeRn + (input * 60 * 1000);
  // Display the initial time before starting to count down.
  displayTime(Math.round(endTime - Date.now()) / 1000);
  // Using an interval function thats called every seconds, display the time.
  intervalVar = setInterval(() => {
    // Calculate seconds remaining on the time.
    const secondsRemaining = Math.round((endTime - Date.now()) / 1000);
    // When time runs out, terminate the interval function and play alarm.
    if(secondsRemaining < 0) {
      clearInterval(intervalVar);
      timeText.innerText = '--';
      document.getElementById('alarm').play();
      return;
    } else {
      displayTime(secondsRemaining);
    }
  }, 1000);
}

/**
 * Given seconds, calculate the hours, minutes, and seconds and 
 * display it to the user.
 * @param {*} seconds 
 */
function displayTime(seconds) {
  // Calculate remaining hours
  let hours = Math.floor(seconds / 60 / 60) + ':';
  if(hours == '0:')
    hours = '00:';
  // Calculate remaining minutes
  let minutesRemaining = Math.floor(seconds / 60) % 60;
  let minutes = minutesRemaining < 10 ? '0' + minutesRemaining + ':' : minutesRemaining + ':';
  if(minutes == '0:')
    minutes = '00:';
  // Calculate remaing seconds
  let second = seconds % 60 < 10 ? '0' + seconds % 60 : seconds % 60;
  if(second == 0)
    seconds = '00';
  // Display time on the DOM
  timeText.innerText = `${hours}${minutes}${second}`;
}

/**
 * Called when reset button is pushed. Clears the timer. 
 * @param {*} event 
 */
function reset(event) {
  // Stop from page reloading when submitting
  event.preventDefault();
  if(canRun) {
    clearInterval(intervalVar);
    canRun = false;
    timeText.innerText = '--';
  }
}

