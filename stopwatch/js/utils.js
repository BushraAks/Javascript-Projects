import { swch, timeContainer } from './index.js'

export function addRemoveClass(elements, newClass, oldClass){
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


export const setDarkMode = () => {
    addRemoveClass([document.body, swch], 'dark-mode', 'light-mode');
    addRemoveClass(timeContainer, 'time-container-dark', 'time-container-light');
}

export const setLightMode = () => {
    addRemoveClass([document.body, swch], 'light-mode', 'dark-mode');

    addRemoveClass(document.body, 'light-mode', 'dark-mode');
    addRemoveClass(swch, 'light-mode', 'dark-mode');
    addRemoveClass(timeContainer, 'time-container-light', 'time-container-dark');
}