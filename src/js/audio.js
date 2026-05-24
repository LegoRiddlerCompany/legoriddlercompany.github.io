const clickaudio        = document.getElementById('clickaudio');
const witamcie          = document.getElementById('witamciebatmanieaudio');
const clocktikaudio     = document.getElementById('clocktikaudio');
const clocktakaudio     = document.getElementById('clocktakaudio');
const callaudio         = document.getElementById('callaudio');

const riddlerWitamAudio = document.getElementById('witam-audio');

const volumevalue       = document.getElementById('volume-value');

function clickSound() {
    clickaudio.play();
}

function witamCieBatmanie() {
    // clickSound();
    witamcie.play();
}

function clockSound(tiktak) {
    if(tiktak) {
        clocktikaudio.play();
    } else {
        clocktakaudio.play();
    }

}

function startSkypeCallSound() {
    callaudio.play();
}
function stopSkypeCallSound() {
    callaudio.pause();
    callaudio.currentTime = 0;
}

function startRiddlerCallAudio() {
    riddlerWitamAudio.play();
}

riddlerWitamAudio.addEventListener('ended', () => {
    folder.open();
    folder.getMeInFront();
    showRiddle(1);
});

volumevalue.addEventListener('input', () => {
    let vol = volumevalue.value / 10;

    clickaudio.volume = vol;
    witamcie.volume = vol;
    clocktikaudio.volume = vol;
    clocktakaudio.volume = vol;
    callaudio.volume = vol;
    riddlerWitamAudio.volume = vol;
});
