const main = document.getElementsByTagName('main')[0];

const robinUnavailable = "Jestem niedostępny, zadzwoń później";

let riddlesUnlocked = 0;
let currentRiddle = 0;
let currentTry = 1;

let timerInterval = null;

let inCall = false;

let apiKey = "";

const delay = ms => new Promise(res => setTimeout(res, ms));

// function waitForElement(selector) {
//     return new Promise(resolve => {
//         if (document.querySelector(selector)) {
//             return resolve(document.querySelector(selector));
//         }
//
//         const observer = new MutationObserver(mutations => {
//             if (document.querySelector(selector)) {
//                 observer.disconnect();
//                 resolve(document.querySelector(selector));
//             }
//         });
//
//         observer.observe(document.body, {
//             childList: true,
//             subtree: true
//         });
//     });
// }
