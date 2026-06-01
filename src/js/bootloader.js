document.addEventListener("DOMContentLoaded", () => {
    const powerScreen = document.getElementById("power-screen");
    const powerBtn = document.getElementById("power-btn");
    const overlay = document.getElementById("boot-overlay");
    const bgMatrix = document.getElementById("boot-bg-matrix");
    const progressFill = document.getElementById("boot-progress-fill");
    const percentageText = document.getElementById("boot-percentage");
    const hintsContainer = document.getElementById("boot-hints");

    if (!overlay || !progressFill || !percentageText || !bgMatrix || !powerScreen || !powerBtn || !hintsContainer) {
        console.error("Bootloader Error: Required layout wrappers are missing from DOM tree.");
        return;
    }

    // const hasBootedBefore = localStorage.getItem("riddlosoft_booted_successfully");

    // COMMENT THESE LINES OUT FOR TESTING:
    // if (hasBootedBefore === "true") {
      powerScreen.remove();
      overlay.remove();
    //   return;
    // }

    // Initial Visibility configurations
    overlay.classList.remove("boot-hidden");

    // ==========================================================================
    // DYNAMIC TELEMETRY TOOLTIPS ENGINE (7.5s CYCLES)
    // ==========================================================================
    const systemHints = [
        "[Ładowanie zasobów...]",
        "Nie zapomnij o notatniku!",
        "RobinGPT może pomóc nawet najlepszemu detektywowi.",
        "Powodzenia Batmanie!"
    ];
    let hintIndex = 0;
    let hintInterval;

    function cycleSystemHints() {
        // 1. Fade out current hint
        hintsContainer.classList.remove("hint-visible");

        setTimeout(() => {
            // 2. Swap text string once hidden
            hintsContainer.innerText = systemHints[hintIndex];

            // 3. Fade back in
            hintsContainer.classList.add("hint-visible");

            // 4. Advance internal pointer loop for the NEXT cycle
            hintIndex = (hintIndex + 1) % systemHints.length;
        }, 500); // Syncs perfectly with CSS opacity transition duration
    }

    // ==========================================================================
    // POWER ON INTERACTION ENGINE & FULLSCREEN TRIGGER
    // ==========================================================================
    powerBtn.addEventListener("click", () => {
        // Play tactile click sound effect instantly at 0.0s
        const clickAudio = new Audio("https://mp3tourl.com/audio/1780284976980-778ac5d0-321c-4263-b305-0d8f5eb203ff.mp3");
        clickAudio.volume = 0.6;
        clickAudio.play().catch(e => console.error("Click audio blocked:", e));

        // Force Device Fullscreen Engine Mode
        const docEl = document.documentElement;
        if (docEl.requestFullscreen) {
            docEl.requestFullscreen().catch(err => console.log("Fullscreen request declined:", err));
        } else if (docEl.mozRequestFullScreen) { /* Firefox */
            docEl.mozRequestFullScreen();
        } else if (docEl.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            docEl.webkitRequestFullscreen();
        } else if (docEl.msRequestFullscreen) { /* IE/Edge */
            docEl.msRequestFullscreen();
        }

        // Clear out the power interface seamlessly
        powerScreen.style.opacity = "0";
        setTimeout(() => {
            powerScreen.remove();
        }, 600);

        // Mark initialization validation token
        localStorage.setItem("riddlosoft_booted_successfully", "true");

        // Ambient Main Track: Starts instantly at 0.0s alongside the click
        const startupAudio = new Audio("https://mp3tourl.com/audio/1780283058810-19191e5d-ecda-42ff-a385-d328cb7c7f43.mp3");
        startupAudio.volume = 0.7;
        startupAudio.play().catch(e => console.error("Startup audio execution blocked:", e));

        // Execute 2-second audio fade out starting at 28.0s
        setTimeout(() => {
            const fadeInterval = setInterval(() => {
                if (startupAudio.volume > 0.035) {
                    startupAudio.volume -= 0.035;
                } else {
                    startupAudio.volume = 0;
                    startupAudio.pause();
                    clearInterval(fadeInterval);
                }
            }, 100);
        }, 28000);

        // Fire core asset engines and tooltip cycler up
        runBootSequence();
        cycleSystemHints(); // Fire first tooltip immediately

        // FIXED: Synced loop timer threshold down to 7.5 seconds (7500ms)
        hintInterval = setInterval(cycleSystemHints, 7500);
        const matrixInterval = setInterval(createFloatingQuestionMark, 750);

        // Register final execution timeout at exactly 30 seconds
        setTimeout(() => {
            clearInterval(matrixInterval);
            clearInterval(hintInterval); // Clear telemetry tracker cleanly

            progressFill.style.width = "100%";
            percentageText.innerText = "100%";

            overlay.classList.add("boot-fade-out");

            // SUCCESS SOUND: Plays perfectly since interaction is guaranteed
            const successAudio = new Audio("https://mp3tourl.com/audio/1780282074501-364cab8c-6151-4057-8637-7549a02407fa.mp3");
            successAudio.volume = 0.8;
            successAudio.play().catch(error => console.error("Success audio blocked:", error));

            setTimeout(() => {
                overlay.remove();
            }, 1000);

        }, 30000);
    });


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

        const randomRotation = Math.floor(Math.random() * 360);
        const randomDuration = Math.random() * 3000 + 3000;

        qMark.style.left = `${randomX}%`;
        qMark.style.top = `${randomY}%`;

        // FIXED: Shifted from absolute pixel assignments to fluid dimensions for your responsive CSS
        qMark.style.fontSize = `${Math.floor(Math.random() * 5) + 3}vh`;
        qMark.style.transform = `rotate(${randomRotation}deg)`;
        qMark.style.animationDuration = `${randomDuration}ms`;

        bgMatrix.appendChild(qMark);

        setTimeout(() => {
            if (qMark.parentNode) qMark.remove();
        }, randomDuration);
    }


    // ==========================================================================
    // PROGRESS BAR TIMELINE TRACKER
    // ==========================================================================
    let currentProgress = 0;
    const totalDuration = 28000;
    let startTime;

    function runBootSequence() {
        if (!startTime) startTime = Date.now();
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
});
