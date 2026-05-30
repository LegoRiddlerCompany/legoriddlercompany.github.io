const backgroundsNumber = 9;
let currentBackground = 0;
let backgroundInterval = null;

let crtEffect = true;

function setBackgroundAutoChange() {
    let autoplay = autoBackground.checked;
    if(autoplay) {
        backgroundInterval = setInterval(nextBackground, backgroundTime_ms);
    } else {
        clearInterval(backgroundInterval);
    }
}
function setBackground() {
    background.style.backgroundImage = "url('/assets/img/background/" + currentBackground + ".png')";
}
function loadBackground() {
    currentBackground = parseInt(localStorage.getItem('bg'));
    if(isNaN(currentBackground)) {
        currentBackground = 0;
    }
    setBackground();
}
function saveBackground() {
    localStorage.setItem('bg', currentBackground);
}
function nextBackground() {
    changeBackground(1);
}
function prevBackground() {
    changeBackground(-1);
}
function changeBackground(direction) {
    currentBackground += parseInt(direction);
    if(currentBackground >= backgroundsNumber) {
        currentBackground = 0;
    }
    if(currentBackground < 0) {
        currentBackground = backgroundsNumber - 1;
    }
    setBackground();
    saveBackground();
}

function setCRTEffect(on) {
    if(on === null) { on = "true"; }
    if(on === "true") {
        body.className = "crt";
    } else {
        body.className = "";
    }
}
function loadCRTEffect() {
    setCRTEffect(localStorage.getItem('crt'));
}
function saveCRTEffect(on) {
    localStorage.setItem('crt', on);
}
