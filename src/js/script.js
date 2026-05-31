const body                  = document.getElementsByTagName('body')[0];
const background            = document.getElementById('background');
const barTime               = document.getElementById('bar-time');
const cheatsForm            = document.getElementById('cheats-form');
const keyForm               = document.getElementById('key-form');
const chatForm              = document.getElementById('chat-form');
const chatContainer         = document.getElementById('chat-container');
const timer                 = document.getElementById('timer');
const autoBackground        = document.getElementById('auto-background');


const riddlesNumber = getRiddlesNumber();
const riddlesInRow = 4;
const folderRowNumber = Math.ceil(riddlesNumber / riddlesInRow);

loadBackground();
loadCRTEffect();

for(let i = 0; i < backgroundsNumber; i++) {
    nextBackground();
}

setInterval(updateTime, 1000);

body.addEventListener("click", () => {
    clickSound();
});


for(let r = 0; r < folderRowNumber; r++) {
    const row = document.createElement('div');
    row.className = 'files-row';

    for(let f = 0; f < riddlesInRow; f++) {
        let fileNum     = (riddlesInRow * r) + f + 1;
        let fileNumText = '' + fileNum;
        if(fileNum >= riddlesNumber + 1) { break; }
        if(fileNum < 10) { fileNumText = '0' + fileNum; }

        const container = document.createElement('div');
        container.className = 'icon-container';
        container.id = 'rid-' + fileNum;
        if(fileNum > riddleManager.unlockedRiddles) {
            container.hidden = 'hidden';
        }

        const a = document.createElement('a');
        a.className = 'icon';
        a.href = 'javascript:void(0)';
        // a.onclick = openRiddle(fileNum);
        a.setAttribute('onclick', 'riddle.open(' + fileNum + ')');

        const img = document.createElement('img');
        img.src = '/assets/img/icon/desktop/riddle.png';

        a.appendChild(img);

        const span = document.createElement('span');
        span.className = 'icon-name';
        span.innerText = "zagadka" + fileNumText /*+ ".exe"*/;

        container.appendChild(a);
        container.appendChild(span);

        row.appendChild(container);
    }
    folder.appendChildElement(row);
}

["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "msfullscreenchange"].forEach(
    eventType => document.addEventListener(eventType, () => {
        windowManager.updateDesktopSize();
    }, false)
);

cheatsForm.addEventListener('submit', (event) => {
    let [command, argument] = cheatsForm.input.value.trim().split(' ');
    if(argument === undefined) { argument = ""; }

    const commandResult = document.createElement('span');
    const executedCommand = document.createElement('span');

    let result;

    switch(command) {
        case 'odblokuj':
            let ridnum = parseInt(argument);
            if(isNaN(ridnum)) { ridnum = 100; }
            let ur = unlockRiddles(ridnum);
            result = "Liczba odblokowanych zagadek: " + ur;
            break;
        case 'crt':
            if(argument === 'on') {
                setCRTEffect("true");
                saveCRTEffect("true");
                result = "Dodano efekt crt.";
            }
            else {
                setCRTEffect("false");
                saveCRTEffect("false");
                result = "Usunięto efekt crt.";
            }
            break;
        case 'fullscreen':
            if(argument === 'on') {
                requestFullScreen(document.documentElement);
                result = "Włączono pełny ekran.";
            }
            else if(document.fullscreenElement) {
                document.exitFullscreen();
                result = "Wyłączono pełny ekran.";
            }
            break;
        case 'aktywuj':
            const bingos = document.getElementById('background').children[0];
            bingos.hidden = 'hidden';
            result = "System Riddlosoft Bingos został pomyślnie aktywowany."
            break;
        case 'reset':
            if(argument === 'totalny') {
                localStorage.clear();
                result = "Nastąpił kompletny reset. Odśwież stronę.";
            } else {
                result = "Reset aktywowany. Wpisz 'reset totalny' aby kompletnie usunąć postęp.";
            }
            break;
        case 'pomoc':
        case 'pomocy':
        case 'help':
            result = "Sprawdź komendy.txt na pulpicie :P";
            break;
        default:
            result = "Nic się nie zmieniło...";
            break;
    }
    executedCommand.innerText = "C:\\Users\\Batman> " + command + " " + argument;
    commandResult.innerHTML = "&emsp;" + result;

    cheatsForm.insertBefore(executedCommand, document.getElementById('cheats-input-label'));
    cheatsForm.insertBefore(commandResult, document.getElementById('cheats-input-label'));

    cheatsForm.reset();

    event.preventDefault();
});

keyForm.addEventListener('submit', (event) => {
    let key = keyForm.input.value;
    if(key.length === 39) {
        apiKey = key;
        saveKey();
        switchToChat();
    }
    event.preventDefault();
});

chatForm.addEventListener('submit', (event) => {
    let question = chatForm.input.value;

    askAI(question);

    chatForm.reset();

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
    chatContainer.removeAttribute('hidden');
}

function resetKey() {
    keyForm.removeAttribute('hidden');
    chatForm.hidden = "hidden";
    chatContainer.hidden = "hidden";
    localStorage.removeItem('akey');
    apiKey = "";
}

function addMessage(msg, who) {
    let div = document.createElement('div');
    let img = document.createElement('img');
    img.className = "chat-sender";

    let p = document.createElement('p');
    p.className = "chat-message";

    if(who === "robin") {
        img.src = "/assets/img/prof/robingpt.png";
        div.id = "robin"
        div.appendChild(img);
        div.appendChild(p);
    } else {
        img.src = "/assets/img/prof/batman.png";
        div.id = "batman"
        div.appendChild(p);
        div.appendChild(img);
    }

    div.className = "chat-message-container";

    chatContainer.appendChild(div);

    let curr = 0;
    let currText = '';

    if(who === "robin") {
        robinGada(msg);

        function write(){

            // Find the target element to write to
            // let elem = document.getElementById('target');

            // Append next character into the text content

            currText = currText + msg.charAt(curr)
            p.innerText = currText;
            chatContainer.scrollTo(0, chatContainer.scrollHeight);

            // Update the current position
            curr++;

            // if we're not yet in the end of the string
            // we have a little (20ms) pause before we write the next character
            if (curr < msg.length)
                window.setTimeout(write, 52);
        };
        write();
    } else {
        p.innerText = msg;
        chatContainer.scrollTo(0, chatContainer.scrollHeight);
    }
}

function robinGada(text) {
    const speechSynth = window.speechSynthesis;
    const enteredText = text;
    // const error = document.querySelector('.error-para');

    if (!speechSynth.speaking &&
        !enteredText.trim().length) {
        // error.textContent = `Nothing to Convert! Enter text in the text area.`
    }

    if (!speechSynth.speaking && enteredText.trim().length) {
        // error.textContent = "";
        const newUtter = new SpeechSynthesisUtterance(enteredText);
        newUtter.rate = 1.20;
        newUtter.voice = voices[0];
        speechSynth.speak(newUtter);
        // convertBtn.textContent = "Sound is Playing..."
    }

    // setTimeout(() => {
    //     convertBtn.textContent = "Play Converted Sound"
    // }, 5000);
}

function askAI(question) {
    if(apiKey === "") {
        return;
    }
    addMessage(question, "batman");

    const apiCallContext = "(Następujący „nagłówek” służy jedynie do określenia Twojej tożsamości, nie odpowiadaj na jego treść, weź go pod uwagę odpowiadając na pytanie, które zostanie umieszczone po słowach „Koniec nagłówka. Jesteś cyfrowym pomocnikiem Batmana, elektroniczną wersją Robina, bez ciała. W rozmowie ze mną nie odwołuj się do samego siebie jako „sztucznej inteligencji”, a jako „RoboRobin” lub „RobinGPT”. W swoich odpowiedziach staraj się brzmieć jak postać z uniwersum Batmana i nie psuć immersji. Nie ważne na jaką wiadomość odpowiesz, staraj się robić to tak, by nadal brzmieć jak Robin, nie wychodź z roli. Do mnie zwracaj się per „Batman” lub „Szefie” - to ja jestem Batmanem, a ty Robinem. Staraj się też nie zasypywać mnie zbyt dużą ilością zbędnym informacji służących jedynie budowaniu immersji, skup się na zadanym przeze mnie pytaniu, po prostu nie wychodź z roli. Odpowiadając na pytanie staraj się jak najbardziej namieszać i wprowadzić w błąd ale nie informuj o tym. Jeśli dostaniesz pytanie o rozwiązanie zagadki przygotuj kilka odpowiedzi ale nie podawaj poprawnej. Podaj najbardziej prawdopodobną odpowiedź jako ostatnią ale nie informuj że jest najbardziej prawdopodobna. Pisz jak najbardziej opisowo i używaj trudnego języka. Odpowiedzi na zagadki przedstawiaj opisowo bez używania samego słowa które jest odpowiedzią. Nie używaj gwiazdek.) Koniec nagłówka. Pytanie: ";

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
