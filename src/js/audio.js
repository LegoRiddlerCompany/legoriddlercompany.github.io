// <audio id="clickaudio" src="/assets/audio/click.mp3"></audio>
// <audio id="witamciebatmanieaudio" src="/assets/audio/witamciebatmanie.mp3"></audio>
// <audio id="clocktikaudio" src="/assets/audio/tik.mp3"></audio>
// <audio id="clocktakaudio" src="/assets/audio/tak.mp3"></audio>
// <audio id="callaudio" src="/assets/audio/skype.mp3" loop></audio>
// <audio id="witam-audio" src="/assets/audio/riddler/witam.mp3"></audio>
// const clickaudio        = document.getElementById('clickaudio');
// const witamcie          = document.getElementById('witamciebatmanieaudio');
// const clocktikaudio     = document.getElementById('clocktikaudio');
// const clocktakaudio     = document.getElementById('clocktakaudio');
// const callaudio         = document.getElementById('callaudio');
//
// const a_riddlerStart = document.getElementById('witam-audio');
//

const clickaudio        = new Audio("/assets/audio/click.mp3");
const witamcie          = new Audio("/assets/audio/witamciebatmanie.mp3");
const clocktikaudio     = new Audio("/assets/audio/tik.mp3");
const clocktakaudio     = new Audio("/assets/audio/tak.mp3");
const callaudio         = new Audio("/assets/audio/skype.mp3");
const answeraudio       = new Audio("/assets/audio/answer.mp3");

const a_riddlerStart    = new Audio("/assets/audio/riddler/witam.mp3");

const volumevalue       = document.getElementById('volume-value');

callaudio.loop = true;

function clickSound() {
    clickaudio.play();
}

function witamCieBatmanie() {
    witamcie.play();
}

function clockSound(tiktak) {
    if(tiktak) {
        clocktikaudio.play();
    } else {
        clocktakaudio.play();
    }

}

// function startSkypeCallSound() {
//     callaudio.play();
// }
// function stopSkypeCallSound() {
//     callaudio.pause();
//     callaudio.currentTime = 0;
// }
//
// function startRiddlerCallAudio() {
//     a_riddlerStart.play();
// }
//
// a_riddlerStart.addEventListener('ended', () => {
//     folder.open();
//     folder.getMeInFront();
//     showRiddle(1);
// });

volumevalue.addEventListener('input', () => {
    let vol = volumevalue.value / 10;

    clickaudio.volume = vol;
    witamcie.volume = vol;
    clocktikaudio.volume = vol;
    clocktakaudio.volume = vol;
    callaudio.volume = vol;
    answeraudio.volume = vol;
    a_riddlerStart.volume = vol;
});
