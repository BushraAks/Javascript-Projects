import { writersTxt, lis } from "./index.js";

//! Some Helper Functions
export function show(element) {
    element.style.visibility = 'visible';
}

export function hide(element) {
    element.style.visibility = 'hidden';
}

export function setMode(mode) {
    document.body.classList = ''; 
    document.body.classList.add(mode);

    if(mode == 'dark-mode'){
        writersTxt.forEach((text) => {
            text.classList= '';
            text.classList.add('writer-dark-mode');
        })
        lis.forEach((li) =>{
            li.classList.add('li-dark-mode');
        })
    }

    else if(mode == 'light-mode' || mode == 'night-mode') {
        writersTxt.forEach((text) => {
            text.classList = '';
            text.classList.add('writer');
        })
        lis.forEach((li) => {
            li.classList = '';
        })
    } 
}

