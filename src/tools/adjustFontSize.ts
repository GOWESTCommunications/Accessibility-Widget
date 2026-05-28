export default function adjustFontSize(multiply: number = 1) {
    document
        .querySelectorAll("h1,h2,h3,h4,h5,h6,p,a,dl,dt,li,ol,th,td,span,blockquote,.gotools-topaccess-text")
        .forEach((el: HTMLElement) => {
            if (!el.classList.contains('material-icons') && !el.classList.contains('fa')) {
                let orgFontSize = Number(el.getAttribute('data-gotools-topaccess-orgFontSize') ?? 0);

                if (!orgFontSize) {
                    orgFontSize = parseFloat(window.getComputedStyle(el).getPropertyValue('font-size'));
                }

                if (multiply === 1) {
                    el.style.removeProperty('--gotools-topaccess-fontSize');
                    el.removeAttribute('data-gotools-topaccess-orgFontSize');
                } else {
                    el.setAttribute('data-gotools-topaccess-orgFontSize', String(orgFontSize));
                    const newFontSize = orgFontSize * multiply;
                    el.style.setProperty('--gotools-topaccess-fontSize', `${newFontSize}px`);
                }
            }
        });

    const $amount: HTMLDivElement = document.querySelector(".gotools-topaccess-amount");
    if ($amount) {
        $amount.innerText = `${(multiply * 100).toFixed(0)}%`;
    }
}
