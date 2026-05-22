const main                  = document.getElementsByTagName('main')[0];
const barTime               = document.getElementById('bar-time');
const form                  = document.getElementById('form');
const cheatsForm            = document.getElementById('cheats-form');
const keyForm               = document.getElementById('key-form');
const chatForm              = document.getElementById('chat-form');
const chatAnswerContainer   = document.getElementById('chat-answer-container');
const timer                 = document.getElementById('timer');
const autoBackground        = document.getElementById('auto-background');


const riddlesNumber = getRiddlesNumber();
const folderRowNumber = Math.ceil(riddlesNumber/5);

const backgroundsNumber = 9;
let currentBackground = 0;
let backgroundInterval = null;

loadBackground();

setInterval(updateTime, 1000);


for(let r = 0; r < folderRowNumber; r++) {
    const row = document.createElement('div');
    row.className = 'files-row';

    for(let f = 0; f < 5; f++) {
        let fileNum     = (5 * r) + f + 1;
        let fileNumText = '' + fileNum;
        if(fileNum >= riddlesNumber + 1) { break; }
        if(fileNum < 10) { fileNumText = '0' + fileNum; }

        const container = document.createElement('div');
        container.className = 'icon-container';
        container.id = 'rid-' + fileNum;
        if(fileNum > riddlesUnlocked) {
            container.hidden = 'hidden';
        }

        const a = document.createElement('a');
        a.className = 'icon';
        a.href = 'javascript:void(0)';
        // a.onclick = openRiddle(fileNum);
        a.setAttribute('onclick', 'riddle.open(' + fileNum + ')');

        const img = document.createElement('img');
        img.src = '/assets/img/icon/riddle.png';

        a.appendChild(img);

        const span = document.createElement('span');
        span.className = 'icon-name';
        span.innerText = "zagadka" + fileNumText + ".exe";

        container.appendChild(a);
        container.appendChild(span);

        row.appendChild(container);
    }
    folder.appendChildElement(row);
}


form.addEventListener('submit', (event) => {
    let answer = form.answer.value;

    if(checkAnswer(currentRiddle - 1, answer)) {
        let nextRiddleNumber = currentRiddle + 1;
        if(nextRiddleNumber >= riddlesNumber) {
            nextRiddleNumber = riddlesNumber;
        }

        const nextRiddle = document.getElementById('rid-' + nextRiddleNumber);
        nextRiddle.removeAttribute('hidden');


        alert("tym razem ci się udało batmanie, czekam na ciebie z kolejną zagadką");
        stopCounting();
    } else {
        if(currentTry === 1) {
            alert("nie udało ci się batmanie, zostały jeszcze dwie próby");
            showHint();
        } else if(currentTry === 2) {
            alert("znowu ci się nie udało batmanie, została jeszcze jedna próba");
        } else if(currentTry >= 3) {
            alert("nie udało ci się batmanie, czas na kare");
            stopCounting();
        }
        currentTry += 1;
    }

    event.preventDefault();
});

cheatsForm.addEventListener('submit', (event) => {
    let riddlesToUnlock = parseInt(cheatsForm.input.value);

    for(let i = 0; i < riddlesToUnlock && i< riddlesNumber; i++) {
        let rNum = i + 1;
        const riddle = document.getElementById('rid-' + rNum);
        riddle.removeAttribute('hidden');
    }

    event.preventDefault();
});

keyForm.addEventListener('submit', (event) => {
    let key = keyForm.input.value;
    if(key.length === 39) {
        apiKey = key;
        saveKey();
        openChat();
    }
    event.preventDefault();
});

chatForm.addEventListener('submit', (event) => {
    let question = chatForm.input.value;

    askAI(question);

    event.preventDefault();
});

function updateTime() {
    let d = new Date();
    let m = d.getMinutes();
    let g = d.getHours();

    if(m < 10) { m = '0' + m; }
    if(g < 10) { g = '0' + g; }

    barTime.innerText = g + ":" + m;
}

function startCounting() {
    clearInterval(timerInterval);
    timer.innerText = "10:00";

    let time = 600;

    timerInterval = setInterval(function () {
        time -= 1;
        if(time <= 0) {
            clearInterval(timerInterval);
        }

        let min = Math.floor(time / 60);
        let sec = time - (min * 60);

        if(min < 10){ min = '0' + min; }
        if(sec < 10){ sec = '0' + sec; }

        timer.innerText = min + ':' + sec;

        clockSound(time % 2);

    }, 1000);
}
function stopCounting() {
    clearInterval(timerInterval);
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
    }
}

function loadKey() {
    let key = localStorage.getItem('akey');
    if(key !== null) {
        apiKey = key;
        switchToChat();
    }
}

function saveKey() {
    if(apiKey !== "") {
        localStorage.setItem('akey', apiKey);
    }
}

function switchToChat() {
    keyForm.hidden = "hidden";
    chatForm.removeAttribute('hidden');
    chatAnswerContainer.removeAttribute('hidden');
}

function resetKey() {
    keyForm.removeAttribute('hidden');
    chatForm.hidden = "hidden";
    chatAnswerContainer.hidden = "hidden";
    localStorage.removeItem('akey');
    apiKey = "";
}

function addMessage(msg, who) {
    let p = document.createElement('p');
    p.className = "chat-answer";
    p.innerText = msg;

    if(who === "robin") {
        p.id = "robin"
    } else {
        p.id = "batman"
    }

    chatAnswerContainer.appendChild(p);
}

function askAI(question) {
    if(apiKey === "") {
        return;
    }
    addMessage(question, "batman");

    const apiCallContext = "(Następujący „nagłówek” służy jedynie do określenia Twojej tożsamości, nie odpowiadaj na jego treść, weź go pod uwagę odpowiadając na pytanie, które zostanie umieszczone po słowach „Koniec nagłówka. Pytanie:” Nagłówek: Jesteś cyfrowym pomocnikiem Batmana, elektroniczną wersją Robina, bez ciała. W rozmowie ze mną nie odwołuj się do samego siebie jako „sztucznej inteligencji”, a jako „RoboRobin” lub „RobinGPT”. W swoich odpowiedziach staraj się brzmieć jak postać z uniwersum Batmana i nie psuć immersji. Nie ważne na jaką wiadomość odpowiesz, staraj się robić to tak, by nadal brzmieć jak Robin, nie wychodź z roli. Do mnie zwracaj się per „Batman” lub „Szefie” - to ja jestem Batmanem, a ty Robinem. Staraj się też nie zasypywać mnie zbyt dużą ilością zbędnym informacji służących jedynie budowaniu immersji, skup się na zadanym przeze mnie pytaniu, po prostu nie wychodź z roli.) Koniec nagłówka. Pytanie: ";

    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent';

    const data = {
        contents: [
            {
                parts: [
                    {
                        text: apiCallContext + question
                    }
                ]
            }
        ]
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-goog-api-key': apiKey
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        let responseText = data.candidates[0].content.parts[0].text;
        addMessage(responseText, "robin");
        // chatAnswer.innerText = responseText;
    })
    .catch(error => {
        console.error('Error:', error);
        addMessage(robinUnavailable, "robin");
    });
}

function setBackgroundAutoChange() {
    let autoplay = autoBackground.checked;
    if(autoplay) {
        backgroundInterval = setInterval(nextBackground, 1000);
    } else {
        clearInterval(backgroundInterval);
    }
}
function loadBackground() {
    currentBackground = parseInt(localStorage.getItem('bg'));
    main.style.backgroundImage = "url('/assets/img/background/" + currentBackground + ".webp')";
}
function saveBackground() {
    localStorage.setItem('bg', currentBackground);
}
function nextBackground() {
    changeBackground(1);
}
function prevBackground() {
    changeBackground(-1);
}
function changeBackground(direction) {
    currentBackground += parseInt(direction);
    if(currentBackground >= backgroundsNumber) {
        currentBackground = 0;
    }
    if(currentBackground < 0) {
        currentBackground = backgroundsNumber - 1;
    }
    main.style.backgroundImage = "url('/assets/img/background/" + currentBackground + ".webp')";
    saveBackground();
}
