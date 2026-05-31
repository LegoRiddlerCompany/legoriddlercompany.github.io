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

const batmanContacts = ["alfred", "harley"];
const maxTime = 600;

const riddleStage = {
    INTRO: 0,
    RIDDLE: 1,
    OUTRO: 2
}

class RiddleManager {
    #form = null;

    #unlockedRiddles = 1;
    #currentRiddle = 1;
    #currentTry = 1;

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

    openRiddle(riddleNumber) {
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
                this.startSkypeCall();
            }
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
        this.#time = localStorage.getItem('riddle-time');
        this.#unlockedRiddles = parseInt(localStorage.getItem('unlocked-riddles'));

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
        this.saveTime();
    }
    saveTime() {
        localStorage.setItem('riddle-time', this.#time);
    }

    unlockNextRiddle() {
        this.#unlockedRiddles += 1;
        showRiddle(this.#currentRiddle + 1);
    }

    get unlockedRiddles() {
        return this.#unlockedRiddles;
    }
}
