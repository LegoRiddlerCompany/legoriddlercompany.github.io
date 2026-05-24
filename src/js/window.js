const skypeElement          = document.getElementById('skype');
const skypeBarElement       = document.getElementById('bar-skype');
const folderElement         = document.getElementById('folder');
const folderBarElement      = document.getElementById('bar-folder');
const folderBodyElement     = document.getElementById('folder-body');
const riddleElement         = document.getElementById('riddle');
const riddleBarElement      = document.getElementById('bar-riddle');
const cheatsElement         = document.getElementById('cheats');
const cheatsBarElement      = document.getElementById('bar-cheats');
const chatElement           = document.getElementById('chat');
const chatBarElement        = document.getElementById('bar-chat');
const volumeElement         = document.getElementById('volume');
const volumeBarElement      = document.getElementById('bar-volume');
const skypeCall             = document.getElementById('skype-call');
const skypeCallDeclineImg   = document.getElementById('skype-call-decline-img');
const bgChangeElement       = document.getElementById('background-change');
const bgChangeBarElement    = document.getElementById('bar-background-change');

const footer                = document.getElementsByTagName('footer')[0];

const windowStatus = {
    CLOSED: 0,
    OPEN: 1,
    MINIMIZED: 2
}

const skype    = new App(skypeElement, skypeBarElement, null);
const folder   = new App(folderElement, folderBarElement, folderBodyElement);
const riddle   = new App(riddleElement, riddleBarElement, null);
const cheats   = new App(cheatsElement, cheatsBarElement, null);
const chat     = new App(chatElement, chatBarElement, null);
const volume   = new App(volumeElement, volumeBarElement, null);
const bgChange = new App(bgChangeElement, bgChangeBarElement, null);

const windowManager = new WindowManager([skype, folder, riddle, cheats, chat, volume, bgChange]);

volume.status = windowStatus.MINIMIZED;
folder.additionalOpenAction  = folderOpenAction;
riddle.additionalOpenAction  = riddleOpenAction;
riddle.additionalCloseAction = riddleCloseAction;
chat.additionalOpenAction    = chatOpenAction;

skypeCall.style.zIndex = windowManager.getListLength();
footer.style.zIndex    = windowManager.getListLength() + 1;

skype.alwaysOnTop(true);
chat.alwaysOnTop(true);

function openCall() {
    skypeCall.removeAttribute('hidden');
    startSkypeCallSound();
}

function closeCall() {
    skypeCall.hidden = 'hidden';
    skypeCallDeclineImg.src = "/assets/img/window/decline.png";
}

async function folderOpenAction() {
    if(!inCall) {
        await delay(2000);
        startCall();
    }
}

function startCall() {
    openCall();
}

function answerCall(declined) {
    if(declined) {
        skypeCallDeclineImg.src = "/assets/img/window/decline-blocked.png";
    } else {
        // Połączenie itd
        skype.open();
        stopSkypeCallSound();
        closeCall();
        inCall = true;
        startRiddlerCallAudio();
    }
}

function riddleOpenAction(riddleNumber) {
    currentRiddle = riddleNumber;
    currentTry = 1;

    hideHint();

    let riddle = getRiddle(riddleNumber - 1);

    document.getElementById('riddle-window-name').innerText = "zagadka " + currentRiddle;
    document.getElementById('riddle-text').innerText = riddle.riddle;
    document.getElementById('riddle-hint').innerText = riddle.hint;

    startCounting();
}

function riddleCloseAction() {
    stopCounting();
}

function chatOpenAction() {
    loadKey();
}

