const main = document.getElementsByTagName('main')[0];

const robinUnavailable = "Jestem niedostępny, zadzwoń później";

const voices = window.speechSynthesis.getVoices();

const backgroundTime_ms = 1000;

const callDelay = 2000; //ms

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
