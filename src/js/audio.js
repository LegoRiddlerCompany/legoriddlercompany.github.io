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
    setVolume(vol);
    saveVolume(vol);
});

function setVolume(vol) {
    if(vol === 0) { mute(); }
    else { unmute(); }
    clickaudio.volume = vol;
    witamcie.volume = vol;
    clocktikaudio.volume = vol;
    clocktakaudio.volume = vol;
    callaudio.volume = vol;
    whatsappcallaudio.volume = vol;
    answeraudio.volume = vol;
    callendaudio.volume = vol;
    if(riddleManager) {
        riddleManager.setVolume(vol);
    }
    if(currentSpeachUtter) {
        currentSpeachUtter.volume = vol;
    }
}

function mute() {
    volume.window.className = "volume-container mute";
}
function unmute() {
    volume.window.className = "volume-container unmute";
}

function saveVolume(vol) {
    localStorage.setItem('vol', vol);
}

function loadVolume() {
    let vol = parseFloat(localStorage.getItem('vol'));
    if(!isNaN(vol)) {
        setVolume(vol);
        volumevalue.value = vol * 10;
    } else {
        setVolume(1);
        volumevalue.value = 10;
    }
}
