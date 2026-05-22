
class WindowManager {
    #appList = [];

    constructor(apps) {
        this.#appList = apps;
        this.setAppsWindowManager();
        this.assignZIndexes();
    }

    getMeInFront(app) {
        let index = this.#appList.indexOf(app);
        if(index > -1) {
            this.#appList.splice(index, 1);
            this.#appList.push(app);
            this.assignZIndexes();
        }
    }

    assignZIndexes() {
        this.#appList.forEach((app, id) => {
            app.window.style.zIndex = id + 1;
        });
    }

    setAppsWindowManager() {
        this.#appList.forEach((app) => {
            app.windowManager = this;
        });
    }

    getListLength() {
        return this.#appList.length;
    }
}
