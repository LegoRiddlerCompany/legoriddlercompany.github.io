class App {
    #windowManager  = null;

    #windowElement  = null;
    #barElement     = null;
    #bodyElement    = null;

    #status         = windowStatus.CLOSED;

    #alwaysOnTop    = false;

    #additionalOpenAction  = () => {};
    #additionalCloseAction = () => {};

    constructor(windowElement, barElement, bodyElement) {
        this.#windowElement = windowElement;
        this.#barElement    = barElement;
        this.#bodyElement   = bodyElement;

        this.#windowElement.addEventListener("mousedown", (event) => {
            this.getMeInFront();
        });
    }

    open(argAction=null) {
        this.#windowElement.removeAttribute('hidden');
        this.#barElement.removeAttribute('hidden');
        this.#status = windowStatus.OPEN;

        this.#additionalOpenAction(argAction);

        this.getMeInFront();
        this.#dragElement(this.#windowElement, this.#windowElement.children[0]);
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
            this.getMeInFront();
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

    alwaysOnTop(status) {
        // if(status)
        //     this.setZIndex(100);
        this.#alwaysOnTop = status;
    }

    getMeInFront() {
        this.#windowManager.getMeInFront(this);
    }

    setZIndex(index) {
        // if(!this.#alwaysOnTop)
            this.#windowElement.style.zIndex = index;
    }

    removeShadow() {
        this.#windowElement.style.filter = 'brightness(100%)';
    }

    addShadow() {
        if(!this.#alwaysOnTop)
            this.#windowElement.style.filter = 'brightness(65%)';
    }

    get window() {
        return this.#windowElement;
    }

    set windowManager(windowManager) {
        this.#windowManager = windowManager;
    }

    set status(status) {
        this.#status = status;
    }

    set additionalOpenAction(func) {
        this.#additionalOpenAction = func;
    }

    set additionalCloseAction(func) {
        this.#additionalCloseAction = func;
    }

    #dragElement(element, draggable) {
        // let thisApp = this;
        let vh = window.innerHeight, vw = window.innerWidth;
        let el = element.getBoundingClientRect();
        let eh = el.height, ew = el.width;
        let maxh = vh - eh;
        let maxw = vw - ew;
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        draggable.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            let newTop    = (element.offsetTop - pos2);
            let newLeft   = (element.offsetLeft - pos1);

            if(newTop < 0) { newTop = 0; }
            if(newTop > maxh) { newTop = maxh; }
            if(newLeft < 0) { newLeft = 0; }
            if(newLeft > maxw) { newLeft = maxw; }

            element.style.top = newTop + "px";
            element.style.left = newLeft + "px";
        }

        function closeDragElement() {
            /* stop moving when mouse button is released:*/
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
}
