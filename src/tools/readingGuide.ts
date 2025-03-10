// @ts-ignore
import template from "./readingGuide.html";

export default function readingGuide(enable=false) {
    let guide = document.querySelector('.gotools-clarity-rg-container');

    if(enable) {
        if(!guide) {
            guide = document.createElement("div");
            guide.setAttribute('class', 'gotools-clarity-rg-container')
            guide.innerHTML = template;

            let rgTop: HTMLElement = guide.querySelector('.gotools-clarity-rg-top');
            let rgBottom: HTMLElement = guide.querySelector('.gotools-clarity-rg-bottom');
            const margin = 20;

            (window as any)._gotools_onScrollReadableGuide = (event) => {
                rgTop.style.height = (event.clientY - margin) + 'px'
                rgBottom.style.height = (window.innerHeight - event.clientY - (margin * 2)) + 'px'
            }

            document.addEventListener('mousemove', (window as any)._gotools_onScrollReadableGuide, { passive: false });
            
            document.body.appendChild(guide);
        }
    } else {
        if(guide) {
            guide.remove();
        }

        if((window as any)._gotools_onScrollReadableGuide) {
            document.removeEventListener('mousemove', (window as any)._gotools_onScrollReadableGuide);
            delete (window as any)._gotools_onScrollReadableGuide;
        }
    }
}