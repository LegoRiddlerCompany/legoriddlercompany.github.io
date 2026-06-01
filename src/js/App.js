class App {
    #windowManager   = null;

    #windowElement   = null;
    #barElement      = null;
    #barLightElement = null;
    #bodyElement     = null;

    #status          = windowStatus.CLOSED;

    #closingAllowed  = true;
    #openingAllowed  = true;

    #alwaysOnTop     = false;
    #alwaysOnBar     = false;

    #additionalOpenAction  = () => {};
    #additionalCloseAction = () => {};

    constructor(windowElement, barElement, bodyElement) {
        this.#windowElement   = windowElement;
        this.#barElement      = barElement;
        this.#bodyElement     = bodyElement;
        this.#barLightElement = barElement.children[1];

        if(this.#barLightElement === undefined) {
            this.#barLightElement = null;
        }

        this.#windowElement.addEventListener("mousedown", (event) => {
            this.getMeInFront();
        });
    }

    open(argAction=null) {
        if(this.#openingAllowed) {
            this.forceOpen(argAction);
        }
    }
    forceOpen(argAction=null) {
        this.#windowElement.removeAttribute('hidden');
        this.#barElement.removeAttribute('hidden');
        if(this.#barLightElement) {
            this.#barLightElement.removeAttribute('hidden');
        }
        this.#status = windowStatus.OPEN;

        this.#additionalOpenAction(argAction);

        this.getMeInFront();
        this.#dragElement(this.#windowElement, this.#windowElement.children[0]);
    }

    toggle() {
        if(this.#status === windowStatus.OPEN) {
            this.#windowElement.hidden = 'hidden';
            if(this.#barLightElement) {
                this.#barLightElement.hidden = 'hidden';
            }
            this.#status = windowStatus.MINIMIZED;
        }
        else if(this.#status === windowStatus.MINIMIZED) {
            this.#windowElement.removeAttribute('hidden');
            if(this.#barLightElement) {
                this.#barLightElement.removeAttribute('hidden');
            }
            this.#status = windowStatus.OPEN;
            this.getMeInFront();
        }
        if(this.#status === windowStatus.CLOSED) {
            this.open();
        }
    }

    minimize() {
        this.#windowElement.hidden = 'hidden';
        if(this.#barLightElement) {
            this.#barLightElement.hidden = 'hidden';
        }
        this.#status = windowStatus.MINIMIZED;
    }

    maximize() {
    }

    close() {
        if(this.#closingAllowed) {
            this.forceClose();
        }
    }
    forceClose() {
        // if(!this.#alwaysOnBar) {
        //     this.#barElement.hidden = 'hidden';
        //     this.#status = windowStatus.CLOSED;
        // } else {
        //     this.#status = windowStatus.MINIMIZED;
        // }
        this.#windowElement.hidden = 'hidden';
        if(!this.#alwaysOnBar) {
            this.#barElement.hidden = 'hidden';
        }
        if(this.#barLightElement) {
            this.#barLightElement.hidden = 'hidden';
        }
        this.#status = windowStatus.CLOSED;

        this.#additionalCloseAction();
    }

    allowClosing() {
        this.#closingAllowed = true;
    }
    forbidClosing() {
        this.#closingAllowed = false;
    }
    allowOpening() {
        this.#openingAllowed = true;
    }
    forbidOpening() {
        this.#openingAllowed = false;
    }

    appendChildElement(element) {
        if(this.#bodyElement !== null) {
            this.#bodyElement.appendChild(element);
        }
    }

    alwaysOnBar(status) {
        this.#alwaysOnBar = status;
        this.#barElement.removeAttribute('hidden');
        // if(status) {
        //     this.#status = windowStatus.MINIMIZED;
        // } else {
        //     this.#status = windowStatus.CLOSED;
        // }
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
        if(this.#alwaysOnTop === false)
            this.#windowElement.style.filter = 'brightness(65%)';
    }

    get window() {
        return this.#windowElement;
    }

    get bar() {
        return this.#barElement;
    }

    set windowManager(windowManager) {
        this.#windowManager = windowManager;
    }

    set status(status) {
        this.#status = status;
    }

    get status() {
        return this.#status;
    }

    set additionalOpenAction(func) {
        this.#additionalOpenAction = func;
    }

    set additionalCloseAction(func) {
        this.#additionalCloseAction = func;
    }

    updateDesktopSize() {
        let element = this.#windowElement;
        let vh = main.offsetHeight, vw = window.innerWidth;
        let el = element.getBoundingClientRect();
        let eh = el.height, ew = el.width;
        let maxh = vh - eh;
        let maxw = vw - ew;
        let top  = element.offsetTop;
        let left = element.offsetLeft;

        if(top < 0) { top = 0; }
        if(top > maxh) { top = maxh; }
        if(left < 0) { left = 0; }
        if(left > maxw) { left = maxw; }

        element.style.top = top + "px";
        element.style.left = left + "px";

        if(this.#status === windowStatus.OPEN) {
            this.open();
            this.#windowElement.hidden = 'hidden';
            this.#windowElement.removeAttribute('hidden');
        }
    }

    #dragElement(element, draggable) {
        let vh = main.offsetHeight, vw = window.innerWidth;
        let el = element.getBoundingClientRect();
        let eh = el.height, ew = el.width;
        let maxh = vh - eh;
        let maxw = vw - ew;
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        draggable.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            element.style.cursor = 'grab';
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
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
            document.onmouseup = null;
            document.onmousemove = null;
            element.style.cursor = 'default';
        }
    }
}
