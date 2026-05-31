const clickaudio        = new Audio("/assets/audio/click.mp3");
const witamcie          = new Audio("/assets/audio/witamciebatmanie.mp3");
const clocktikaudio     = new Audio("/assets/audio/tik.mp3");
const clocktakaudio     = new Audio("/assets/audio/tak.mp3");
const callaudio         = new Audio("/assets/audio/skype.mp3");
const whatsappcallaudio = new Audio("/assets/audio/whatsapp.mp3");
const answeraudio       = new Audio("/assets/audio/answer.mp3");
const callendaudio      = new Audio("/assets/audio/callend.mp3");

const volumevalue       = document.getElementById('volume-value');

callaudio.loop = true;
whatsappcallaudio.loop = true;

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

volumevalue.addEventListener('input', () => {
    let vol = volumevalue.value / 10;

    clickaudio.volume = vol;
    witamcie.volume = vol;
    clocktikaudio.volume = vol;
    clocktakaudio.volume = vol;
    callaudio.volume = vol;
    whatsappcallaudio.volume = vol;
    answeraudio.volume = vol;
    callendaudio.volume = vol;
});
