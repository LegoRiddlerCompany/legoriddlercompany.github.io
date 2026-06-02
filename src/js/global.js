const main = document.getElementsByTagName('main')[0];

const robinUnavailable = "Jestem niedostępny, zadzwoń później";

const voices = window.speechSynthesis.getVoices();

const backgroundTime_ms = 30000; //ms

const callDelay = 2000; //ms

const welcomeMessage = "Szefie, melduję się na stanowisku! Tu RoboRobin - Twoje osobiste wsparcie techniczne, system operacyjny Bat-komputera i cyfrowe ramię w walce z przestępczością w Gotham. Jestem gotów do przetwarzania danych, łamania szyfrów i zabezpieczeń oraz analizy taktycznej, kiedy tylko będziesz tego potrzebował. Czekam na Twoje rozkazy! Co planujemy na dzisiejszą noc?";

let riddleManager = null;

let initialOpen = false;

let robertMessageSent = false;

let apiKey = "";
let currentSpeachUtter = null;
let listenToRobinNow = false;

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
