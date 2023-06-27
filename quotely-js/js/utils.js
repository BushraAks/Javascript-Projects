//! Some Helper Functions
export function setMode(mode) {
    document.body.classList = ''; // first delete all existing classes;
    document.body.classList.add(mode); // set needed one;
}

export function show(element, value) {
    element.style.visibility = value;
}

export function hide(element, value) {
    element.style.visibility = value;
}