import { addRemoveClass, setDarkMode, setLightMode } from './utils.js';

const timeDisplay = document.querySelector('.time-display'),
    startBtn = document.querySelector('#start-button'),
    resetBtn = document.querySelector('#reset-button');

export const timeContainer = document.querySelector('.time-container');
let startTime = 0;
let elapsedTime = 0;
let stoped = true;
let intervalID;
let hrs = 0;
let mins = 0;
let secs = 0;
let milisOne = 0;  
let milisTwo = 0;

// toggle switch

export const swch = document.querySelector('.switch');
export const slider = document.querySelector('.slider');

let switchOff = true;

swch.addEventListener('click', (event) => {
    if (switchOff){
        slider.style.transform = 'translateX(26px)';
        switchOff = false;
        setDarkMode();
    }
    else{
        slider.style.transform = '';
        switchOff = true;
        setLightMode();
    }
})

// end toggle switch

// Start button click listener
startBtn.addEventListener('click', () => {
    addRemoveClass(startBtn, 'start-btn-click', 'timer-btn-bg');
    if(stoped) { 
        startBtn.innerText = 'Pause';
        stoped = false;
        startTime = Date.now() - elapsedTime;
        intervalID = setInterval(updateTime, 1);
    }
    else if (!stoped){
        stoped = true;
        startBtn.innerText = 'Resume';
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalID);
    }
});

// reset button click listener
resetBtn.addEventListener('click', () => {
    startBtn.innerText = 'Start';
    addRemoveClass(startBtn, 'timer-btn-bg', 'start-btn-click');

    stoped = true;
    clearInterval(intervalID);
    startTime = 0;
    elapsedTime = 0;
    hrs = 0;
    mins = 0;
    secs = 0;
    milisOne = 0;
    milisTwo = 0;


    timeDisplay.innerHTML = 
        `
        00:00:00<span class="mili-digit1 mili-digit">0</span><span class="mili-digit2 mili-digit">0</span>                
        `;
    
});

// function to precede single digit with zero    
const addZero = (digit) => {
    return (('0') + digit).length > 2 ? digit : '0' + digit;
}

// function to update contents of the time
const updateTime = () => {
    elapsedTime = Date.now() - startTime;
    milisOne = elapsedTime.toString().charAt(elapsedTime.toString().length - 3);
    milisTwo = elapsedTime.toString().charAt(elapsedTime.toString().length - 2);
    if(!milisOne){milisOne = 0};
    if(!milisTwo){milisTwo = 0};

    secs = Math.floor(elapsedTime / 1000 % 60);
    mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
    hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);

    timeDisplay.innerHTML = 
        `
        ${addZero(hrs)}:${addZero(mins)}:${addZero(secs)}<span class="mili-digit1 mili-digit">${milisOne}</span><span class="mili-digit2 mili-digit">${milisTwo}</span>          
        `;

}

// For current time

const curTime = document.querySelector('.cur-time');

let now = new Date();
let hour = now.getHours();
const amOrPm = () => { return hour >= 12? 'pm' : 'am'};
hour %= 12 ;
let minute = now.getMinutes();
let second = now.getSeconds();
curTime.innerHTML = `Current time: ${hour}:${addZero(minute)}:${addZero(second)}${amOrPm()}`;

setInterval(() => {
    let now = new Date();
    let hour = now.getHours();
    hour %= 12 ;
    if(hour == 0) {hour = 12};
    let minute = now.getMinutes();
    let second = now.getSeconds(); 
    curTime.innerHTML = `Current time: ${hour}:${addZero(minute)}:${addZero(second)}${amOrPm()}`;
    }, 1000
)

