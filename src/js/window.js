const skypeCall             = document.getElementById('skype-call');
const skypeCallDeclineImg   = document.getElementById('skype-call-decline-img');

const footer                = document.getElementsByTagName('footer')[0];

const windowStatus = {
    CLOSED: 0,
    OPEN: 1,
    MINIMIZED: 2
}

const skype     = new App(document.getElementById('skype'),             document.getElementById('bar-skype'),             null);
const folder    = new App(document.getElementById('folder'),            document.getElementById('bar-folder'),            document.getElementById('folder-body'));
const riddle    = new App(document.getElementById('riddle'),            document.getElementById('bar-riddle'),            null);
const cheats    = new App(document.getElementById('cheats'),            document.getElementById('bar-cheats'),            null);
const chat      = new App(document.getElementById('chat'),              document.getElementById('bar-chat'),              null);
const volume    = new App(document.getElementById('volume'),            document.getElementById('bar-volume'),            null);
const wallpaper = new App(document.getElementById('background-change'), document.getElementById('bar-background-change'), null);
const note      = new App(document.getElementById('note'),              document.getElementById('bar-note'),              null);

skype.alwaysOnTop(true);
chat.alwaysOnTop(true);

const windowManager = new WindowManager([skype, folder, riddle, cheats, chat, volume, wallpaper, note]);

volume.status = windowStatus.MINIMIZED;
folder.additionalOpenAction  = folderOpenAction;
riddle.additionalOpenAction  = riddleOpenAction;
riddle.additionalCloseAction = riddleCloseAction;
chat.additionalOpenAction    = chatOpenAction;

skypeCall.style.zIndex = windowManager.getListLength();
footer.style.zIndex    = windowManager.getListLength() + 1;



cheats.window.addEventListener("click", () => {
    if(cheats.status === windowStatus.OPEN) {
        const input = document.getElementById('cheats-input');
        input.focus();
        input.scrollIntoView();
    }
});

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

