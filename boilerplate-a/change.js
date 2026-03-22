const STYLES = ["style-1","style-2"];

class Toggler {
    constructor(styles) {
        this.styles = styles;
        this.currentIndex = 0;
        this.linkElements = [];
        this.init();
    }

    init() {
        for (const style of this.styles) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = `./${style}.css`;
            link.disabled = true;

            document.head.appendChild(link);
            this.linkElements.push(link);
        }

        if (this.linkElements.length > 0) {
            this.linkElements[0].disabled = false;
        }

        this.drawToggler();
    }

    toggle() {
        this.linkElements[this.currentIndex].disabled = true;

        this.currentIndex = (this.currentIndex + 1) % this.linkElements.length;

        this.linkElements[this.currentIndex].disabled = false;
    }

    drawToggler() {
        const toggle = document.createElement('button');

        toggle.innerHTML = 'button.png';

        toggle.addEventListener('click', () => {
            this.toggle();
        });

        toggle.style.position = 'fixed';
        toggle.style.bottom = '10px';
        toggle.style.right = '10px';
        toggle.style.zIndex = '1000';

        document.body.appendChild(toggle);
    }
}

new Toggler(STYLES);