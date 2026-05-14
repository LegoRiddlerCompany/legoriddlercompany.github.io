const skype                 = document.getElementById('skype');
const barskype              = document.getElementById('bar-skype');
const folder                = document.getElementById('folder');
const barfolder             = document.getElementById('bar-folder');
const folderbody            = document.getElementById('folder-body');
const riddle                = document.getElementById('riddle');
const barriddle             = document.getElementById('bar-riddle');
const cheats                = document.getElementById('cheats');
const volume                = document.getElementById('volume');
const barvolume             = document.getElementById('bar-volume');
const skypecall             = document.getElementById('skype-call');
const skypecalldeclineimg   = document.getElementById('skype-call-decline-img');

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
    skype.removeAttribute('hidden');
    barskype.removeAttribute('hidden');
    skypeStatus = windowStatus.OPEN;
    clickSound();
}
function toggleSkype() {
    if(skypeStatus === windowStatus.OPEN){
        skype.hidden = 'hidden';
        skypeStatus = windowStatus.MINIMIZED;
    }
    else if(skypeStatus === windowStatus.MINIMIZED){
        skype.removeAttribute('hidden');
        skypeStatus = windowStatus.OPEN;
    }
    clickSound();
}
function minimizeSkype() {
    skype.hidden = 'hidden';
    skypeStatus = windowStatus.MINIMIZED;
    clickSound();
}
function maximizeSkype() {
    clickSound();
}
function closeSkype() {
    skype.hidden = 'hidden';
    barskype.hidden = 'hidden';
    skypeStatus = windowStatus.CLOSED;
    clickSound();
}
//////////////////

// FOLDER
async function openFolder() {
    folder.removeAttribute('hidden');
    barfolder.removeAttribute('hidden');
    folderStatus = windowStatus.OPEN;
    clickSound();

    if(!inCall) {
        await delay(2000);
        startCall();
    }
}
function toggleFolder() {
    if(folderStatus === windowStatus.OPEN){
        folder.hidden = 'hidden';
        folderStatus = windowStatus.MINIMIZED;
    }
    else if(folderStatus === windowStatus.MINIMIZED){
        folder.removeAttribute('hidden');
        folderStatus = windowStatus.OPEN;
    }
    clickSound();
}
function minimizeFolder() {
    folder.hidden = 'hidden';
    folderStatus = windowStatus.MINIMIZED;
    clickSound();
}
function maximizeFolder() {
    clickSound();
}
function closeFolder() {
    folder.hidden = 'hidden';
    barfolder.hidden = 'hidden';
    folderStatus = windowStatus.CLOSED;
    clickSound();
}
//////////////////

// ZAGATKA
function openRiddle(riddleNumber) {
    currentRiddle = riddleNumber;
    currentTry = 1;

    riddle.removeAttribute('hidden');
    barriddle.removeAttribute('hidden');
    startCounting();
    riddleStatus = windowStatus.OPEN;

    clickSound();
}
function toggleRiddle() {
    if(riddleStatus === windowStatus.OPEN){
        riddle.hidden = 'hidden';
        riddleStatus = windowStatus.MINIMIZED;
    }
    else if(riddleStatus === windowStatus.MINIMIZED){
        riddle.removeAttribute('hidden');
        riddleStatus = windowStatus.OPEN;
    }
    clickSound();
}
function minimizeRiddle() {
    riddle.hidden = 'hidden';
    riddleStatus = windowStatus.MINIMIZED;
    clickSound();
}
function maximizeRiddle() {
    clickSound();
}
function closeRiddle() {
    riddle.hidden = 'hidden';
    barriddle.hidden = 'hidden';

    stopCounting();

    riddleStatus = windowStatus.CLOSED;

    clickSound();
}
//////////////////

// UNLOCK
function openCheats() {
    cheats.removeAttribute('hidden');
    clickSound();
}
function minimizeCheats() {
    cheats.hidden = 'hidden';
    clickSound();
}
function maximizeCheats() {
    clickSound();
}
function closeCheats() {
    cheats.hidden = 'hidden';
    clickSound();
}
//////////////////

// VOLUME
function toggleVolume() {
    if(volumeStatus === windowStatus.OPEN){
        volume.hidden = 'hidden';
        volumeStatus = windowStatus.MINIMIZED;
    }
    else if(volumeStatus === windowStatus.MINIMIZED){
        volume.removeAttribute('hidden');
        volumeStatus = windowStatus.OPEN;
    }
    clickSound();
}
//////////////////

function openCall() {
    skypecall.removeAttribute('hidden');
    startSkypeCallSound();
}
function closeCall() {
    skypecall.hidden = 'hidden';
    skypecalldeclineimg.src = "/assets/img/window/decline.png";
}

