const btn = document.getElementById('start-pause-button');
const flagButton = document.getElementById('flag-button');
const resetButton = document.getElementById('reset-button');
const timer = document.getElementById('stopwatch-header');
const checkpoints = document.getElementById('checkpoints')

let checkpointNumber = 1;

let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let int = null;

let state = false;
let running = false;

let h, m, s, ms;

btn.addEventListener('click', function onClick() {
    if(!state) {
        if(int !== null) {
            clearInterval(int);
        }
        int = setInterval(displayTimer, 10);
        btn.style.backgroundColor = 'rgb(12,12,12)';
        btn.style.color = 'white';
        btn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
        flagButton.disabled = false;
        resetButton.disabled = false;
        running = true;
    }
    else {
        clearInterval(int);
        btn.style.backgroundColor = '';
        btn.style.color = '';
        btn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    }
    state = !state;
});

flagButton.addEventListener('click', function onClick(){
    clearInterval(int);
    checkpoints.style.display = 'block'
    if(checkpointNumber == 1){
        checkpoints.innerHTML += `<div class="checks">Checkpoint ${checkpointNumber}: <span class="checkpoint-time">${h}:${m}:${s}.${ms}</span></div>`
    }
    else{
        checkpoints.innerHTML += `<hr><div class="checks">Checkpoint ${checkpointNumber}: <span class="checkpoint-time">${h}:${m}:${s}.${ms}</span></div>`
    }
    checkpointNumber++;
    if(checkpointNumber > 3) {
        checkpoints.style.overflowY = 'scroll';
    }
    running = false;
    state = false;
    flagButton.disabled = true;
    btn.style.backgroundColor = '';
    btn.style.color = '';
    btn.innerHTML = `<i class="fa-solid fa-play"></i>`;
});

resetButton.addEventListener('click', function onClick() {
    checkpointNumber = 1;
    checkpoints.style.overflowY = 'visible';
    clearInterval(int);
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    timer.innerHTML = `00:00<span class="seconds">:00</span>`;
    checkpoints.innerHTML = '';
    checkpoints.style.display = 'none';
    btn.style.backgroundColor = '';
    btn.style.color = '';
    btn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    flagButton.disabled = true;
    resetButton.disabled = true;
    state = running = false;
});

function displayTimer() {
    milliseconds += 10;

    if(milliseconds > 1000) {
        milliseconds = 0
        seconds += 1;
    
        if(seconds == 60) {
            seconds = 0;
            minutes += 1;
    
            if(minutes == 60) {
                minutes = 0;
                hours += 1;
            }
        }
    }

    h = hours > 9? hours:'0' + hours;
    m = minutes > 9? minutes:'0' + minutes;
    s = seconds > 9? seconds:'0' + seconds;
    ms = milliseconds > 99? milliseconds:milliseconds > 9? '0' + milliseconds:'00' + milliseconds;

    console.log("Hello");

    timer.innerHTML = `${h}:${m}<span class="seconds">:${s}</span>`;
}