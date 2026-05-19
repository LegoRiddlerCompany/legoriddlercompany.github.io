const delay = ms => new Promise(res => setTimeout(res, ms));

const form       = document.getElementById('form');
const cheatsForm = document.getElementById('cheats-form');
const timer      = document.getElementById('timer');


const riddlesNumber   = getRiddlesNumber();
const folderRowNumber = Math.ceil(37/5);

let riddlesUnlocked = 1;
let currentRiddle = 0;
let currentTry = 1;

let timerInterval = null;

let inCall = false;

// <div id="zagadka" class="icon-container">
//  <a class="icon" href="javascript:void(0)" onclick="openRiddle(id)"><img src="/assets/kat1.png"></a>
//  <span class="icon-name">zagadka1.exe</span>
// </div>

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
        a.setAttribute('onclick', 'openRiddle(' + fileNum + ')');

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
    folderBodyElement.appendChild(row);
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
        openSkype();
        stopSkypeCallSound();
        closeCall();
        inCall = true;
    }
}
