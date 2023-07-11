const  startBtn = document.querySelector('#start-btn'),
       resetBtn = document.querySelector('#reset-btn'),
       timeDisplay = document.querySelector('.time-display'),
       dayNum = document.querySelector('.day-num'),
       hourNum = document.querySelector('.hour-num'),
       minNum = document.querySelector('.min-num'),
       secNum = document.querySelector('.sec-num');

let stoped = true;
const second = 1000; // 1 second = 1000 milliseconds
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const nums = document.querySelectorAll('.num');


function countDown(){
    let dateTo = new Date('August 1, 2023 00:00:00').getTime();
    let dateNow = new Date().getTime();
    let gap = dateTo - dateNow;

    const dayTxt = Math.floor(gap / day);
    const hourTxt = Math.floor((gap % day) / hour);
    const minTxt = Math.floor((gap % hour) / minute);
    const secTxt = Math.floor((gap % minute) / second);

    if (dayTxt == '0' && hourTxt == '0' && minTxt == '0' && secTxt <= 30) {
        nums.forEach((num) => {
            num.style.color = 'red';
        })
    }
    else {
        nums.forEach((num) => {
            num.style.color = '#40c437';
        })
    }
    dayNum.innerText =  addZero(dayTxt);
    hourNum.innerText = addZero(hourTxt);
    minNum.innerText = addZero(minTxt);
    secNum.innerText = addZero(secTxt);

}

setInterval(countDown, 75);


// start button click
startBtn.addEventListener('click', () => {
    addRemoveClass(startBtn, 'start-btn-clicked', 'timer-btn-bg');
    if(stoped) { 
        startBtn.innerText = 'Pause';
        stoped = false;
    }
    else if (!stoped){
        stoped = true;
        startBtn.innerText = 'Resume';
    }
});


// reset button click
resetBtn.addEventListener('click', () => {
    startBtn.innerText = 'Start';
    addRemoveClass(startBtn, 'timer-btn-bg', 'start-btn-clicked');

    stoped = true;
})


// util functions
function addRemoveClass(elements, newClass, oldClass){
    if (Array.isArray(elements)){
        elements.forEach((element) => {
            element.classList.add(newClass);
            element.classList.remove(oldClass);
        });
    }
    else{
        elements.classList.add(newClass);
        elements.classList.remove(oldClass);
    }
}

function addZero(digit) {
    return (('0') + digit).length > 2 ? digit : '0' + digit;
}