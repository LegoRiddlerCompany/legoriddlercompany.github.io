const skypeElement          = document.getElementById('skype');
const skypeBarElement       = document.getElementById('bar-skype');
const folderElement         = document.getElementById('folder');
const folderBarElement      = document.getElementById('bar-folder');
const folderBodyElement     = document.getElementById('folder-body');
const riddleElement         = document.getElementById('riddle');
const riddleBarElement      = document.getElementById('bar-riddle');
const cheatsElement         = document.getElementById('cheats');
const volumeElement         = document.getElementById('volume');
const volumeBarElement      = document.getElementById('bar-volume');
const skypeCall             = document.getElementById('skype-call');
const skypeCallDeclineImg   = document.getElementById('skype-call-decline-img');

const windowStatus = {
    CLOSED: 0,
    OPEN: 1,
    MINIMIZED: 2
}


let skypeStatus  = windowStatus.CLOSED;
let folderStatus = windowStatus.CLOSED;
let riddleStatus = windowStatus.CLOSED;
let volumeStatus = windowStatus.MINIMIZED;

// SKYPE
function openSkype() {
    skypeElement.removeAttribute('hidden');
    skypeBarElement.removeAttribute('hidden');
    skypeStatus = windowStatus.OPEN;
    clickSound();
}
function toggleSkype() {
    if(skypeStatus === windowStatus.OPEN){
        skypeElement.hidden = 'hidden';
        skypeStatus = windowStatus.MINIMIZED;
    }
    else if(skypeStatus === windowStatus.MINIMIZED){
        skypeElement.removeAttribute('hidden');
        skypeStatus = windowStatus.OPEN;
    }
    clickSound();
}
function minimizeSkype() {
    skypeElement.hidden = 'hidden';
    skypeStatus = windowStatus.MINIMIZED;
    clickSound();
}
function maximizeSkype() {
    clickSound();
}
function closeSkype() {
    skypeElement.hidden = 'hidden';
    skypeBarElement.hidden = 'hidden';
    skypeStatus = windowStatus.CLOSED;
    clickSound();
}
//////////////////

// FOLDER
async function openFolder() {
    folderElement.removeAttribute('hidden');
    folderBarElement.removeAttribute('hidden');
    folderStatus = windowStatus.OPEN;
    clickSound();

    if(!inCall) {
        await delay(2000);
        startCall();
    }
}
function toggleFolder() {
    if(folderStatus === windowStatus.OPEN){
        folderElement.hidden = 'hidden';
        folderStatus = windowStatus.MINIMIZED;
    }
    else if(folderStatus === windowStatus.MINIMIZED){
        folderElement.removeAttribute('hidden');
        folderStatus = windowStatus.OPEN;
    }
    clickSound();
}
function minimizeFolder() {
    folderElement.hidden = 'hidden';
    folderStatus = windowStatus.MINIMIZED;
    clickSound();
}
function maximizeFolder() {
    clickSound();
}
function closeFolder() {
    folderElement.hidden = 'hidden';
    folderBarElement.hidden = 'hidden';
    folderStatus = windowStatus.CLOSED;
    clickSound();
}
//////////////////

// ZAGATKA
function openRiddle(riddleNumber) {
    currentRiddle = riddleNumber;
    currentTry = 1;

    hideHint();

    riddleElement.removeAttribute('hidden');
    riddleBarElement.removeAttribute('hidden');

    let riddle = getRiddle(riddleNumber - 1);

    document.getElementById('riddle-window-name').innerText = "zagadka " + currentRiddle;
    document.getElementById('riddle-text').innerText = riddle.riddle;
    document.getElementById('riddle-hint').innerText = riddle.hint;

    startCounting();
    riddleStatus = windowStatus.OPEN;

    clickSound();
}
function toggleRiddle() {
    if(riddleStatus === windowStatus.OPEN){
        riddleElement.hidden = 'hidden';
        riddleStatus = windowStatus.MINIMIZED;
    }
    else if(riddleStatus === windowStatus.MINIMIZED){
        riddleElement.removeAttribute('hidden');
        riddleStatus = windowStatus.OPEN;
    }
    clickSound();
}
function minimizeRiddle() {
    riddleElement.hidden = 'hidden';
    riddleStatus = windowStatus.MINIMIZED;
    clickSound();
}
function maximizeRiddle() {
    clickSound();
}
function closeRiddle() {
    riddleElement.hidden = 'hidden';
    riddleBarElement.hidden = 'hidden';

    stopCounting();

    riddleStatus = windowStatus.CLOSED;

    clickSound();
}
//////////////////

// UNLOCK
function openCheats() {
    cheatsElement.removeAttribute('hidden');
    clickSound();
}
function minimizeCheats() {
    cheatsElement.hidden = 'hidden';
    clickSound();
}
function maximizeCheats() {
    clickSound();
}
function closeCheats() {
    cheatsElement.hidden = 'hidden';
    clickSound();
}
//////////////////

// VOLUME
function toggleVolume() {
    if(volumeStatus === windowStatus.OPEN){
        volumeElement.hidden = 'hidden';
        volumeStatus = windowStatus.MINIMIZED;
    }
    else if(volumeStatus === windowStatus.MINIMIZED){
        volumeElement.removeAttribute('hidden');
        volumeStatus = windowStatus.OPEN;
    }
    clickSound();
}
//////////////////

function openCall() {
    skypeCall.removeAttribute('hidden');
    startSkypeCallSound();
}
function closeCall() {
    skypeCall.hidden = 'hidden';
    skypeCallDeclineImg.src = "/assets/img/window/decline.png";
}

