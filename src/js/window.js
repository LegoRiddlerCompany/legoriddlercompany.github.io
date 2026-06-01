const skypeCall             = document.getElementById('skype-call');
const whatsappCall          = document.getElementById('whatsapp-call');
const whatsappCallName      = document.getElementById('whatsapp-call-name');
const whatsappCallText      = document.getElementById('whatsapp-call-text').children[0];
const whatsappCallProf      = document.getElementById('whatsapp-call-prof');
// const skypeCallDeclineImg   = document.getElementById('skype-call-decline-img');

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
const whatsapp  = new App(document.getElementById('whatsapp'),          document.getElementById('bar-whatsapp'),          null);


volume.alwaysOnTop(true);
skype.alwaysOnTop(true);
skype.alwaysOnBar(true);
// chat.alwaysOnTop(true);
chat.alwaysOnBar(true);

riddle.forbidOpening();

const windowManager = new WindowManager([skype, folder, riddle, cheats, chat, volume, wallpaper, note, whatsapp]);

volume.status = windowStatus.MINIMIZED;
folder.additionalOpenAction   = folderOpenAction;
riddle.additionalOpenAction   = riddleOpenAction;
riddle.additionalCloseAction  = riddleCloseAction;
chat.additionalOpenAction     = chatOpenAction;
cheats.additionalOpenAction   = focusCheatsInput;
whatsapp.additionalOpenAction = whatsappOpenAction;


skypeCall.style.zIndex    = windowManager.getListLength();
whatsappCall.style.zIndex = windowManager.getListLength();
footer.style.zIndex       = windowManager.getListLength() + 1;

cheats.window.addEventListener("click", focusCheatsInput);

function focusCheatsInput() {
    if(cheats.status === windowStatus.OPEN) {
        const input = document.getElementById('cheats-input');
        input.focus();
        input.scrollIntoView();
    }
}

// function closeCall() {
//     skypeCall.hidden = 'hidden';
//     skypeCallDeclineImg.src = "/assets/img/window/decline.png";
// }

async function folderOpenAction() {
    if(!initialOpen) {
        await delay(callDelay);
        //startCall();
        riddleManager.start();
    }
}

function whatsappOpenAction(who) {
    document.getElementById('whatsapp-title').innerText = "Whatsbatt - " + callersList[who].fullname;
    document.getElementById('whatsapp-avatar').src = callersList[who].img;
}

function riddleOpenAction(riddleNumber) {
    if(riddleNumber > 1 && riddleNumber === riddleManager.unlockedRiddles) {
        riddleManager.hideRiddleContent();
    }
    riddleManager.openRiddle(riddleNumber);
}

function riddleCloseAction() {
    riddle.allowOpening();
    // stopCounting();
}

function chatOpenAction() {
    loadKey();
}

