const  startBtn = document.querySelector('#start-btn'),
       resetBtn = document.querySelector('#reset-btn'),
       timeDisplay = document.querySelector('.time-display');

let stoped = true;
let hrs = 0;
let mins = 0;
let secs = 0;


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