// stage: 0
//
//

// const stages = [
//     {
//         name: "start",
//         unlocks: 0,
//         caller: "riddler",
//     },
//     {
//         name: "riddle",
//         unlocks: 1,
//         caller: "harley",
//     }
// ]
//
//
// function getCallFrom(who) {
//
// }
//
// function answerCall() {
//
// }
/*
const vid = document.getElementById('video');
const src = document.getElementById('source');

const svid = document.getElementById('video-swap');
const ssrc = document.getElementById('source-swap');
*/

// vid.style.zIndex = '3';
// svid.style.zIndex = '2';

// vid.addEventListener('ended', () => {
//     vid.pause();
//
//     vid.style.zIndex = '1';
//     vid.removeAttribute('controls');
//
//     src.setAttribute('src', '/assets/video/rushing/0.mp4');
//     vid.load();
//
//     // vid.hidden = 'hidden';
//     //
//     // svid.removeAttribute('hidden');
//     // svid.load();
//
//
//     svid.play();
//
//     // vid.play();
// });

// svid.addEventListener('ended', () => {
//     svid.pause();
//
//     // svid.hidden = 'hidden';
//     //
//     // vid.removeAttribute('hidden');
//
//     vid.style.zIndex = '3';
//
//
//     vid.play();
// });


// src="/assets/video/riddle/0.mp4"
// src="/assets/video/waiting/0.mp4"

const riddleStage = {
    INTRO: 0,
    RIDDLE: 1,
    OUTRO: 2
}

class RiddleManager {
    #form = null;

    #unlockedRiddles = 1;
    #currentRiddle = 0;
    #currentTry = 1;

    #video = null;
    #swap  = null;

    #timerInterval = null;
    #rushingTime = [30, 60, 90]; // w sekundach
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
    }

    init() {
        this.#stage = riddleStage.INTRO;

        this.#video.el.style.zIndex = '3';
        this.#swap.el.style.zIndex = '2';

        this.#video.src.setAttribute('src', '/assets/video/riddle/0.mp4');
        this.#swap.src.setAttribute('src', '/assets/video/waiting/0.mp4');

        this.#video.el.load();
        this.#swap.el.load();

        this.#video.el.addEventListener('ended', () => {
            this.#video.el.pause();

            this.#video.el.style.zIndex = '1';

            if(this.#stage === riddleStage.INTRO) {
                riddle.forceOpen(1);
                riddle.getMeInFront();
                this.#stage = riddleStage.RIDDLE;
            } else if(this.#stage === riddleStage.RIDDLE) {
                this.resume();
            } else if(this.#stage === riddleStage.OUTRO) {
                console.log("OUTRO");
                skype.close();
                riddle.forceClose();
                riddle.allowOpening();
                riddle.allowClosing();
            }

            this.#swap.el.play();
        });

        this.#form.addEventListener('submit', (event) => {
            let answer = this.#form.answer.value;

            if(checkAnswer(this.#currentRiddle - 1, answer)) {
                // let nextRiddleNumber = this.#currentRiddle + 1;
                // if(nextRiddleNumber >= riddlesNumber) {
                //     nextRiddleNumber = riddlesNumber;
                // }

                // const nextRiddle = document.getElementById('rid-' + nextRiddleNumber);
                // nextRiddle.removeAttribute('hidden');
                this.playCorrectAnswerVideo();

                this.#stage = riddleStage.OUTRO;
                this.unlockNextRiddle();

                this.stopCounting();
            } else {
                if(this.#currentTry === 1) {

                    this.playWrongAnswerVideo();
                } else if(this.#currentTry === 2) {

                    this.playWrongAnswerVideo();
                } else if(this.#currentTry >= 3) {
                    this.playWrongAnswerVideo();

                    this.#stage = riddleStage.OUTRO;
                    this.unlockNextRiddle();
                    this.stopCounting();
                }
                this.#currentTry += 1;
            }

            event.preventDefault();
        });
    }

    start() {
        this.startSkypeCall();
    }

    openRiddle(riddleNumber) {
        this.#currentRiddle = riddleNumber;
        this.#currentTry = 1;

        let riddleEntry = getRiddle(riddleNumber - 1);

        document.getElementById('riddle-window-name').innerText = "zagadka " + riddleNumber;
        document.getElementById('riddle-text').innerText = riddleEntry.riddle;
        console.log(this.#currentRiddle, this.#unlockedRiddles, this.#currentRiddle === this.#unlockedRiddles);
        if(this.#currentRiddle === this.#unlockedRiddles) {
            riddle.forbidClosing();
            this.startCounting();
        }
    }

    startCounting() {
        clearInterval(this.#timerInterval);
        timer.innerText = "10:00";

        let time = 600;
        let rushingT = this.#rushingTime;

        this.#timerInterval = setInterval(() => {
            if(!this.#paused) {
                time -= 1;
                if(time <= 0) {
                    clearInterval(this.#timerInterval);
                }

                let min = Math.floor(time / 60);
                let sec = time - (min * 60);

                if(min < 10){ min = '0' + min; }
                if(sec < 10){ sec = '0' + sec; }

                timer.innerText = min + ':' + sec;

                if(time === 600 - rushingT[0]) {
                    this.playRushingVideo('m', 0);
                } else if(time === 600 - rushingT[1]) {
                    this.playRushingVideo('m', 1);
                } else if(time === 600 - rushingT[2]) {
                    this.playRushingVideo('m', 2);
                }
                clockSound(time % 2);
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
            // Połączenie itd
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

    playRiddleVideo() {
        answeraudio.play();
        this.#video.el.load();
        this.#video.el.play();
    }
    playRushingVideo(who, num) {
        this.#video.src.setAttribute('src', '/assets/video/rushing/' + who + '/' + num + '.mp4');
        this.#video.el.load();
        this.#video.el.style.zIndex = '3';
        skype.open();
        this.#video.el.play();
    }
    playWrongAnswerVideo() {
        this.pause();
        let ridnum = this.#currentRiddle - 1;
        this.#video.src.setAttribute('src', '/assets/video/wrong/' + this.#currentTry + '/' + ridnum + '.mp4');
        this.#video.el.load();
        this.#video.el.style.zIndex = '3';
        skype.open();
        this.#video.el.play();
    }
    playCorrectAnswerVideo() {
        this.pause();
        let ridnum = this.#currentRiddle - 1;
        this.#video.src.setAttribute('src', '/assets/video/correct/' + ridnum + '.mp4');
        this.#video.el.load();
        this.#video.el.style.zIndex = '3';
        skype.open();
        this.#video.el.play();
    }

    answerWhatsappCall() {
        whatsapp.open("joker");
    }

    pause() {
        this.#paused = true;
    }
    resume() {
        this.#paused = false;
    }

    load() {
        this.#paused = false;
    }

    save() {

    }

    unlockNextRiddle() {
        this.#unlockedRiddles += 1;
        showRiddle(this.#currentRiddle + 1);
    }

    get unlockedRiddles() {
        return this.#unlockedRiddles;
    }
}

const riddleManager = new RiddleManager();

riddleManager.init();
