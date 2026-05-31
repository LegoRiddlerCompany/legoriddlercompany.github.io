const main = document.getElementsByTagName('main')[0];

const robinUnavailable = "Jestem niedostępny, zadzwoń później";

const voices = window.speechSynthesis.getVoices();

const backgroundTime_ms = 1000;

// let riddlesUnlocked = 40;
// let currentRiddle = 0;
// let currentTry = 1;

// let timerInterval = null;

let initialOpen = false;

let apiKey = "";

const delay = ms => new Promise(res => setTimeout(res, ms));

function requestFullScreen(element) {
    // Supports most browsers and their versions.
   let requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

    if (requestMethod) { // Native full screen.
        requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        let wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}
