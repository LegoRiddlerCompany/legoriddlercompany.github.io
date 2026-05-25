const hintElement = document.getElementById("riddle-hint");

function getRiddlesNumber() {
    return riddlesList.length;
}

function checkAnswer(id, answer) {
    if(id > riddlesList.length || id < 0) {
        console.warn("zle id :(");
        return false;
    }

    let riddle = riddlesList[id];

    return riddle.answers.includes(answer.toLowerCase());
}

// function getHint(id) {
//     if(id > riddlesList.length || id < 0) {
//         console.warn("zle id :(");
//         return "";
//     }
//     return riddlesList[id].hint;
// }

function getRiddle(id) {
    if(id > riddlesList.length || id < 0) {
        console.warn("zle id :(");
        return "";
    }
    return riddlesList[id];
}

function showRiddle(number) {
    if(number >= riddlesNumber) {
        number = riddlesNumber;
    }
    const nextRiddle = document.getElementById('rid-' + number);
    nextRiddle.removeAttribute('hidden');
}

function showHint() {
    hintElement.removeAttribute('hidden');
}

function hideHint() {
    hintElement.hidden = "hidden";
}

function unlockRiddles(riddlesToUnlock) {
    for(let i = 0; i < riddlesToUnlock && i < riddlesNumber; i++) {
        let rNum = i + 1;
        const riddle = document.getElementById('rid-' + rNum);
        riddle.removeAttribute('hidden');
    }

    return Math.min(riddlesToUnlock, riddlesNumber);
}
