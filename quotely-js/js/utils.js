//! Some Helper Functions
export function setMode(mode) {
    document.body.classList = ''; // first delete all existing classes;
    document.body.classList.add(mode); // set needed one;
}
  // if we're making 2 separae functions for hide and show, we dont need two parameters.
export function show(element) {
    element.style.visibility = 'visible';
}

export function hide(element) {
    element.style.visibility = 'hidden';
}