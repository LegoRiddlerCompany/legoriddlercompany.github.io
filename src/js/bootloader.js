document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("boot-overlay");
    const bgMatrix = document.getElementById("boot-bg-matrix");
    const progressFill = document.getElementById("boot-progress-fill");
    const percentageText = document.getElementById("boot-percentage");

    if (!overlay || !progressFill || !percentageText || !bgMatrix) {
        console.error("Bootloader Error: Required layout wrappers are missing from DOM tree.");
        return;
    }

    // const hasBootedBefore = localStorage.getItem("riddlosoft_booted_successfully");

    // COMMENT THESE LINES OUT FOR TESTING:
    // if (hasBootedBefore === "true") {
    //   overlay.remove();
    //   return;
    // }

    // First run confirmed: Render the wrapper blocks visible
    overlay.classList.remove("boot-hidden");

    // COMMENT THIS LINE OUT FOR TESTING AS WELL:
    // localStorage.setItem("riddlosoft_booted_successfully", "true");
    // localStorage.setItem("riddlosoft_booted_successfully", "true");


    // ==========================================================================
    // RANDOM DYNAMIC QUESTION MARKS ENGINE
    // ==========================================================================
    function createFloatingQuestionMark() {
        if (!bgMatrix || overlay.style.visibility === "hidden" || overlay.style.display === "none") return;

        let randomX, randomY;
        let isValidPosition = false;
        let attempts = 0;

        const activeMarks = bgMatrix.querySelectorAll(".matrix-question-mark");

        while (!isValidPosition && attempts < 50) {
            randomX = Math.random() * 90;
            randomY = Math.random() * 90;
            attempts++;

            const inCenterZone = (randomX > 22 && randomX < 78) && (randomY > 15 && randomY < 70);
            const inFooterZone = (randomX > 28 && randomX < 72) && (randomY > 65 && randomY < 95);

            if (inCenterZone || inFooterZone) {
                continue;
            }

            let hitsAnotherMark = false;

            for (let mark of activeMarks) {
                const existingX = parseFloat(mark.style.left);
                const existingY = parseFloat(mark.style.top);

                const distanceX = Math.abs(randomX - existingX);
                const distanceY = Math.abs(randomY - existingY);

                if (distanceX < 12 && distanceY < 12) {
                    hitsAnotherMark = true;
                    break;
                }
            }

            if (!hitsAnotherMark) {
                isValidPosition = true;
            }
        }

        if (!isValidPosition) return;

        const qMark = document.createElement("span");
        qMark.className = "matrix-question-mark";
        qMark.innerText = "?";

        const randomSize = Math.floor(Math.random() * 97) + 45;
        const randomRotation = Math.floor(Math.random() * 360);
        const randomDuration = Math.random() * 3000 + 3000;

        qMark.style.left = `${randomX}%`;
        qMark.style.top = `${randomY}%`;
        qMark.style.fontSize = `${randomSize}px`;
        qMark.style.transform = `rotate(${randomRotation}deg)`;
        qMark.style.animationDuration = `${randomDuration}ms`;

        bgMatrix.appendChild(qMark);

        setTimeout(() => {
            if (qMark.parentNode) qMark.remove();
        }, randomDuration);
    }

    const matrixInterval = setInterval(createFloatingQuestionMark, 750);


    // ==========================================================================
    // PROGRESS BAR TIMELINE TRACKER
    // ==========================================================================
    let currentProgress = 0;
    const totalDuration = 13000;
    const startTime = Date.now();

    function runBootSequence() {
        const elapsed = Date.now() - startTime;

        if (elapsed >= totalDuration || currentProgress >= 100) {
            progressFill.style.width = "100%";
            percentageText.innerText = "100%";
            return;
        }

        const timelineBaseline = (elapsed / totalDuration) * 100;
        const randomStep = Math.floor(Math.random() * 9) + 1;
        const systemStall = Math.random() < 0.35;

        if (!systemStall) {
            currentProgress += randomStep;
        }

        if (currentProgress < timelineBaseline) {
            currentProgress = Math.min(timelineBaseline + 3, 98);
        }
        if (currentProgress > timelineBaseline + 12) {
            currentProgress = Math.min(timelineBaseline + 12, 98);
        }

        if (currentProgress >= 99) currentProgress = 98;

        progressFill.style.width = `${currentProgress}%`;
        percentageText.innerText = `${Math.floor(currentProgress)}%`;

        const nextTickDelay = Math.floor(Math.random() * 830) + 120;
        setTimeout(runBootSequence, nextTickDelay);
    }

    runBootSequence();


    // ==========================================================================
    // GLOBAL DESTROY CLOSURE TIMER (EXECUTES AT EXACTLY 20 SECONDS)
    // ==========================================================================
    setTimeout(() => {
        clearInterval(matrixInterval);
        overlay.classList.add("boot-fade-out");

        setTimeout(() => {
            overlay.remove();
        }, 1000);

    }, 15000);
});
