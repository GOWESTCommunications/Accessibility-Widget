export default function adjustFontSize(multiply: number = 1) {
    document
        .querySelectorAll("h1,h2,h3,h4,h5,h6,p,a,dl,dt,li,ol,th,td,span,blockquote,.gotools-clarity-text")
        .forEach((el: HTMLElement) => {
            if (!el.classList.contains('material-icons') && !el.classList.contains('fa')) {
                let orgFontSize = Number(el.getAttribute('data-gotools-clarity-orgFontSize') ?? 0);

                if (!orgFontSize) {
                    orgFontSize = parseFloat(window.getComputedStyle(el).getPropertyValue('font-size'));
                }

                if (multiply === 1) {
                    el.style.removeProperty('--gotools-clarity-fontSize');
                    el.removeAttribute('data-gotools-clarity-orgFontSize');
                } else {
                    el.setAttribute('data-gotools-clarity-orgFontSize', String(orgFontSize));
                    const newFontSize = orgFontSize * multiply;
                    el.style.setProperty('--gotools-clarity-fontSize', `${newFontSize}px`);
                }
            }
        });

    const $amount: HTMLDivElement = document.querySelector(".gotools-clarity-amount");
    if ($amount) {
        $amount.innerText = `${(multiply * 100).toFixed(0)}%`;
    }
}
