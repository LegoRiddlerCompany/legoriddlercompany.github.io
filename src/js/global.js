const delay = ms => new Promise(res => setTimeout(res, ms));

const robinUnavailable = "Jestem niedostępny, zadzwoń później";

let riddlesUnlocked = 1;
let currentRiddle = 0;
let currentTry = 1;

let timerInterval = null;

let inCall = false;

let apiKey = "";
