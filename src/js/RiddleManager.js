const batmanContacts = ["alfred", "aquaman", "barbara", "penguin", "jim", "superman", "twoface", "joker", "lucius", "harley", "rasalghul", "robin"];
const maxTime = 20;

const riddleStage = {
    INTRO: 0,
    RIDDLE: 1,
    OUTRO: 2
}

class RiddleManager {
    #form = null;
    #riddleWindowBody = null;

    #unlockedRiddles = 1;
    #currentRiddle = 1;
    #currentTry = 1;

    #volume = 1;

    #video = null;
    #swap  = null;
    #audio = null;

    #timerInterval = null;
    #rushingTime = [30, 60, 90]; // w sekundach
    #time = maxTime;
    #paused = false;

    #stage = riddleStage.INTRO;

    constructor() {
        this.#form = document.getElementById('riddle-form');
        this.#video = {
            el:  document.getElementById('video'),
            src: document.getElementById('source')
        };
        this.#swap = {
            el:  document.getElementById('video-swap'),
            src: document.getElementById('source-swap')
        };
        this.#riddleWindowBody = document.getElementById('riddle-window-body');
    }

    init() {
        this.#stage = riddleStage.INTRO;
        this.#currentRiddle = 1;

        this.#video.el.style.zIndex = '5';
        this.#swap.el.style.zIndex = '1';

        this.#video.src.setAttribute('src', '/assets/video/riddle/0.mp4');
        this.#swap.src.setAttribute('src', '/assets/video/waiting/0.mp4');

        this.#video.el.load();
        this.#swap.el.load();

        let helper  = riddlesList[0].helper.name;
        let track   = riddlesList[0].helper.track;
        this.#audio = callersList[helper].audio[track];

        this.#video.el.addEventListener('ended', () => {
            this.resume();
            this.showRiddleContent();
            this.#video.el.pause();

            this.#video.el.style.zIndex = '2';
            this.#swap.el.style.zIndex = '4';

            if(this.#stage === riddleStage.INTRO) {
                if(this.#currentRiddle === 1) {
                    riddle.forceOpen(this.#currentRiddle);
                }
                riddle.getMeInFront();
                this.#stage = riddleStage.RIDDLE;
            } else if(this.#stage === riddleStage.RIDDLE) {
                this.resume();
            } else if(this.#stage === riddleStage.OUTRO) {
                skype.close();
                callendaudio.play();
                riddle.forceClose();
                riddle.allowOpening();
                riddle.allowClosing();
                this.videoReset();
                this.colorIcon(this.#currentRiddle, this.#currentTry);
                this.#time = maxTime;
                this.#stage = riddleStage.INTRO;
                this.save();
            }

            this.#swap.el.play();
        });

        this.#audio.addEventListener('ended', () => {
            whatsapp.close();
            this.playWrongAnswerVideo();
        });

        this.#form.addEventListener('submit', (event) => {
            if(!this.#paused) {
                let answer = this.#form.answer.value;

                if(checkAnswer(this.#currentRiddle - 1, answer)) {
                    this.playCorrectAnswerVideo();

                    this.#stage = riddleStage.OUTRO;
                    this.unlockNextRiddle();

                    this.stopCounting();
                } else {
                    if(this.#currentTry === 1) {

                        this.playWrongAnswerVideo();
                    } else if(this.#currentTry === 2) {
                        this.pause();
                        this.startWhatsappCall();
                        // this.playWrongAnswerVideo();
                    } else if(this.#currentTry >= 3) {
                        this.playWrongAnswerVideo();

                        this.#stage = riddleStage.OUTRO;
                        this.unlockNextRiddle();
                        this.stopCounting();
                    }
                    // this.#currentTry += 1;
                }
            }
            this.#form.reset();
            event.preventDefault();
        });
    }

    start() {
        this.startSkypeCall();
    }

    async openRiddle(riddleNumber) {
        this.#currentRiddle = riddleNumber;
        this.#currentTry = 1;

        let riddleEntry = getRiddle(riddleNumber - 1);

        document.getElementById('riddle-window-name').innerText = "zagadka " + riddleNumber;
        document.getElementById('riddle-text').innerText = riddleEntry.riddle;

        if(this.#currentRiddle === this.#unlockedRiddles) {
            riddle.forbidClosing();
            this.startCounting();

            if(this.#currentRiddle > 1) {
                this.load();
                this.pause();
                await delay(callDelay);
                this.startSkypeCall();
                riddle.forbidOpening();
            }
        }
        if(this.#currentRiddle < this.#unlockedRiddles) {
            this.load();
            this.#stage = riddleStage.RIDDLE;
            riddle.forbidOpening();
        }
    }

    startCounting() {
        clearInterval(this.#timerInterval);
        timer.innerText = "10:00";

        let time = this.#time;
        let rushingT = this.#rushingTime;
        let who   = riddlesList[this.#currentRiddle - 1].who;
        let track = riddlesList[this.#currentRiddle - 1].rushingtrack;

        this.#timerInterval = setInterval(() => {
            if(!this.#paused) {
                time -= 1;
                if(time <= 0) {
                    this.#currentTry = 3;
                    this.#form.answer.value = "Czas się skończył batmanie";
                    this.#form.requestSubmit();
                    clearInterval(this.#timerInterval);
                }

                let min = Math.floor(time / 60);
                let sec = time - (min * 60);

                if(min < 10){ min = '0' + min; }
                if(sec < 10){ sec = '0' + sec; }

                timer.innerText = min + ':' + sec;

                if(time      === maxTime - rushingT[0]) { this.playRushingVideo(who, track[0]); }
                else if(time === maxTime - rushingT[1]) { this.playRushingVideo(who, track[1]); }
                else if(time === maxTime - rushingT[2]) { this.playRushingVideo(who, track[2]); }

                clockSound(time % 2);
                this.#time = time;
            }
        }, 1000);
    }
    stopCounting() {
        clearInterval(this.#timerInterval);
    }

    startSkypeCall() {
        skypeCall.removeAttribute('hidden');
        this.startSkypeCallSound();
    }
    startSkypeCallSound() {
        callaudio.play();
    }
    answerSkypeCall(declined) {
        if(declined) {
        } else {
            skype.open();
            this.stopSkypeCallSound();
            this.closeSkypeCall();
            initialOpen = true;
            this.playRiddleVideo();
        }
    }
    stopSkypeCallSound() {
        callaudio.pause();
        callaudio.currentTime = 0;
    }
    closeSkypeCall() {
        skypeCall.hidden = 'hidden';
    }

    startWhatsappCall() {
        whatsappCall.removeAttribute('hidden');
        let helper = riddlesList[this.#currentRiddle - 1].helper.name;
        if(batmanContacts.includes(helper)) {
            whatsappCallName.innerText = "Whatsbatt - " + callersList[helper].fullname;
            whatsappCallText.innerText = "Dzwoni " + callersList[helper].fullname;
            whatsappCallProf.src = callersList[helper].img;
        } else {
            whatsappCallName.innerText = "Whatsbatt";
            whatsappCallText.innerText = "Dzwoni nieznany numer..."
            whatsappCallProf.src = callersList["unknown"].img;
        }
        this.startWhatsappCallSound();
    }
    startWhatsappCallSound() {
        whatsappcallaudio.play();
    }
    answerWhatsappCall() {
        this.stopWhatsappCallSound();
        this.closeWhatsappCall();
        whatsapp.open(riddlesList[this.#currentRiddle - 1].helper.name);
        answeraudio.play();
        answeraudio.addEventListener('ended', () => {
            this.#audio.play();
        }, { once: true });
    }
    stopWhatsappCallSound() {
        whatsappcallaudio.pause();
        whatsappcallaudio.currentTime = 0;
    }
    closeWhatsappCall() {
        whatsappCall.hidden = 'hidden';
    }

    playRiddleVideo() {
        this.#video.el.style.zIndex = '5';
        this.#swap.el.style.zIndex = '1';
        answeraudio.play();
        this.#video.el.load();
        this.#video.el.play();
    }
    playRushingVideo(who, num) {
        this.#video.src.setAttribute('src', '/assets/video/rushing/' + who + '/' + num + '.mp4');
        this.#video.el.load();
        this.#video.el.style.zIndex = '5';
        this.#swap.el.style.zIndex = '1';
        skype.open();
        this.#video.el.play();
    }
    playWrongAnswerVideo() {
        this.pause();
        let who = riddlesList[this.#currentRiddle - 1].who;
        let losetrack = riddlesList[this.#currentRiddle - 1].losetrack[this.#currentTry - 1];
        this.#video.src.setAttribute('src', '/assets/video/wrong/' + this.#currentTry + '/' + who + '/' + losetrack + '.mp4');
        this.#video.el.load();
        this.#video.el.style.zIndex = '5';
        this.#swap.el.style.zIndex = '1';
        skype.open();
        this.#video.el.play();

        this.#currentTry += 1;
    }
    playCorrectAnswerVideo() {
        this.pause();
        let who = riddlesList[this.#currentRiddle - 1].who;
        let wintrack = riddlesList[this.#currentRiddle - 1].wintrack;
        this.#video.src.setAttribute('src', '/assets/video/correct/' + who + '/' + wintrack + '.mp4');
        this.#video.el.load();
        this.#video.el.style.zIndex = '5';
        this.#swap.el.style.zIndex = '1';
        skype.open();
        this.#video.el.play();
    }
    videoReset() {
        this.#video.el.pause();
        this.#video.el.currentTime = 0;
        this.#swap.el.pause();
        this.#swap.el.currentTime = 0;
    }

    pause() {
        this.#paused = true;
    }
    resume() {
        this.#paused = false;
    }

    load() {
        this.#stage = riddleStage.INTRO;
        this.#time = parseInt(localStorage.getItem('riddle-time'));
        this.#unlockedRiddles = parseInt(localStorage.getItem('unlocked-riddles'));
        if(isNaN(this.#time)) {
            this.#time = maxTime;
        }
        if(isNaN(this.#unlockedRiddles)) {
            this.#unlockedRiddles = 1;
        }
        if(this.#unlockedRiddles > 1) {
            initialOpen = true;
            riddle.allowOpening();
        }

        this.#video.el.style.zIndex = '5';
        this.#swap.el.style.zIndex = '1';

        let ridnum = this.#currentRiddle - 1;
        this.#video.src.setAttribute('src', '/assets/video/riddle/' + ridnum + '.mp4');
        this.#swap.src.setAttribute('src', '/assets/video/waiting/0.mp4');

        this.#video.el.load();
        this.#swap.el.load();

        let helper  = riddlesList[ridnum].helper.name;
        let track   = riddlesList[ridnum].helper.track;
        this.#audio = callersList[helper].audio[track];

        unlockRiddles(this.#unlockedRiddles);
        this.resume();
    }

    save() {
        localStorage.setItem('unlocked-riddles', this.#unlockedRiddles);
        localStorage.setItem('rid-' + this.#currentRiddle, this.#currentTry);
        this.saveTime();
    }
    saveTime() {
        localStorage.setItem('riddle-time', this.#time);
    }

    unlockNextRiddle() {
        if(this.#currentRiddle === this.#unlockedRiddles) {
            this.#unlockedRiddles += 1;
            showRiddle(this.#currentRiddle + 1);
        }
    }

    hideRiddleContent() {
        this.#riddleWindowBody.children[0].hidden = "hidden";
        this.#riddleWindowBody.children[1].hidden = "hidden";
    }
    showRiddleContent() {
        this.#riddleWindowBody.children[0].removeAttribute('hidden');
        this.#riddleWindowBody.children[1].removeAttribute('hidden');
    }

    colorIcon(id, level) {
        let ridid = "rid-" + id;
        let icon = document.getElementById(ridid).children[0];
        let iconimg = icon.children[0];
        if(level === 1) {
            icon.style.background = "linear-gradient(to bottom, var(--top) 0%, #ffdd00 100%)";
            iconimg.style.filter = "hue-rotate(305deg) saturate(200%) brightness(160%) drop-shadow(0 0.3vh 0.6vh rgb(255 224 0))";
        } else if(level === 2) {
            icon.style.background = "linear-gradient(to bottom, var(--top) 0%, #dfdfdf 100%)";
            iconimg.style.filter = "saturate(0%) brightness(160%) drop-shadow(0 0.3vh 0.6vh rgb(223 223 223))";
        } else if(level === 3) {
            icon.style.background = "linear-gradient(to bottom, var(--top) 0%, #bb8354 100%)";
            iconimg.style.filter = "hue-rotate(285deg) saturate(80%) drop-shadow(0 0.3vh 0.6vh rgb(186 130 83))";
        } else {
            icon.style.background = "linear-gradient(to bottom, var(--top) 0%, var(--mid) 100%)";
            iconimg.style.filter = "saturate(0%) drop-shadow(0 0.3vh 0.6vh rgba(4, 80, 50, 0.3))";
        }
    }

    loadIconsColors() {
        for(let i = 1; i <= this.#unlockedRiddles; i++) {
            let lvl = parseInt(localStorage.getItem('rid-' + i));
            if(!isNaN(lvl)) {
                this.colorIcon(i, lvl);
            }
        }
    }

    setVolume(vol) {
        this.#volume = vol;
        this.updateVolume();
    }
    updateVolume() {
        this.#audio.volume = this.#volume;
        this.#video.colume = this.#volume;
        this.#swap.volume  = this.#volume;
    }

    get unlockedRiddles() {
        return this.#unlockedRiddles;
    }

    generateFolderRiddles() {
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
        this.loadIconsColors();
    }
}
