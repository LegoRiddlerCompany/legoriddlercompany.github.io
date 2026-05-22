class App {
    #windowElement  = null;
    #barElement     = null;
    #bodyElement    = null;

    #status         = windowStatus.CLOSED;

    #additionalOpenAction  = () => {};
    #additionalCloseAction = () => {};

    constructor(windowElement, barElement, bodyElement) {
        this.#windowElement = windowElement;
        this.#barElement    = barElement;
        this.#bodyElement   = bodyElement;
    }

    open(argAction=null) {
        this.#windowElement.removeAttribute('hidden');
        this.#barElement.removeAttribute('hidden');
        this.#status = windowStatus.OPEN;

        this.#additionalOpenAction(argAction);
        clickSound();
    }

    toggle() {
        if(this.#status === windowStatus.OPEN){
            this.#windowElement.hidden = 'hidden';
            this.#status = windowStatus.MINIMIZED;
        }
        else if(this.#status === windowStatus.MINIMIZED){
            this.#windowElement.removeAttribute('hidden');
            this.#status = windowStatus.OPEN;
        }
        clickSound();
    }

    minimize() {
        this.#windowElement.hidden = 'hidden';
        this.#status = windowStatus.MINIMIZED;
        clickSound();
    }

    maximize() {
        clickSound();
    }

    close() {
        this.#windowElement.hidden = 'hidden';
        this.#barElement.hidden = 'hidden';
        this.#status = windowStatus.CLOSED;

        this.#additionalCloseAction();
        clickSound();
    }

    appendChildElement(element) {
        if(this.#bodyElement !== null) {
            this.#bodyElement.appendChild(element);
        }
    }

    set additionalOpenAction(func) {
        this.#additionalOpenAction = func;
    }

    set additionalCloseAction(func) {
        this.#additionalCloseAction = func;
    }

}
