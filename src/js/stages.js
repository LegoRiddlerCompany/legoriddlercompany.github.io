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

const riddleManager = RiddleManager();

riddleManager.init();

class RiddleManager {
    #form = null;

    constructor() {
        this.#form = document.getElementById('riddle-form');
    }

    init() {
        this.#form.addEventListener('submit', (event) => {
            let answer = riddleForm.answer.value;

            if(checkAnswer(currentRiddle - 1, answer)) {
                // let nextRiddleNumber = currentRiddle + 1;
                // if(nextRiddleNumber >= riddlesNumber) {
                //     nextRiddleNumber = riddlesNumber;
                // }

                // const nextRiddle = document.getElementById('rid-' + nextRiddleNumber);
                // nextRiddle.removeAttribute('hidden');
                showRiddle(currentRiddle + 1);

                alert("tym razem ci się udało batmanie, czekam na ciebie z kolejną zagadką");
                stopCounting();
            } else {
                if(currentTry === 1) {
                    alert("nie udało ci się batmanie, zostały jeszcze dwie próby");
                } else if(currentTry === 2) {
                    alert("znowu ci się nie udało batmanie, została jeszcze jedna próba");
                    showHint();
                } else if(currentTry >= 3) {
                    alert("nie udało ci się batmanie, czas na kare");
                    stopCounting();
                }
                currentTry += 1;
            }

            event.preventDefault();
        });
    }

    start() {
        this.startSkypeCall();
    }

    openRiddle(riddleNumber) {
        currentRiddle = riddleNumber;
        currentTry = 1;

        hideHint();

        let riddle = getRiddle(riddleNumber - 1);

        document.getElementById('riddle-window-name').innerText = "zagadka " + currentRiddle;
        document.getElementById('riddle-text').innerText = riddle.riddle;
        document.getElementById('riddle-hint').innerText = riddle.hint;

        startCounting();
    }

    startSkypeCall() {
        skypeCall.removeAttribute('hidden');
        startSkypeCallSound();
    }
    startSkypeCallSound() {
        callaudio.play();
    }
    answerSkypeCall(declined) {
        if(declined) {
            skypeCallDeclineImg.src = "/assets/img/window/decline-blocked.png";
        } else {
            // Połączenie itd
            skype.open();
            this.stopSkypeCallSound();
            this.closeSkypeCall();
            initialOpen = true;
            this.initialRiddlerCallAudio();
        }
    }
    stopSkypeCallSound() {
        callaudio.pause();
        callaudio.currentTime = 0;
    }
    closeSkypeCall() {
        skypeCall.hidden = 'hidden';
        skypeCallDeclineImg.src = "/assets/img/window/decline.png";
    }

    initialRiddlerCallAudio() {
        a_riddlerStart.addEventListener('ended', () => {
            folder.open();
            folder.getMeInFront();
            showRiddle(1);
        });
        a_riddlerStart.play();
    }


    load() {

    }

    save() {

    }
}
