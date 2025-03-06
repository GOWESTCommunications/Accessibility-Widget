export default function adjustFontSize(multiply:number = 1) {
    document
        .querySelectorAll("h1,h2,h3,h4,h5,h6,p,a,dl,dt,li,ol,th,td,span,blockquote,.go-aw-text")
        .forEach((el: HTMLElement) => {
            if(!el.classList.contains('material-icons') && !el.classList.contains('fa')) {
                let orgFontSize = Number(el.getAttribute('data-go-aw-orgFontSize') ?? 0);
    
                if(!orgFontSize) {
                    orgFontSize = parseInt(window.getComputedStyle(el).getPropertyValue('font-size'));
                    el.setAttribute('data-go-aw-orgFontSize', String(orgFontSize));
                }
    
                let newFontSize = orgFontSize * multiply;
    
                el.style['font-size'] = newFontSize + 'px';
            }
        });
    
    let $amount: HTMLDivElement = document.querySelector(".go-aw-amount");

    if($amount) {
        $amount.innerText = `${ (multiply * 100).toFixed(0) }%`
    }
}