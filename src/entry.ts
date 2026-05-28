import config from "./config";

declare global {
    interface Window {
        gotoolsTopAccessConfig: any;
        /** @deprecated Use gotoolsTopAccessConfig instead. Kept for legacy integrations. */
        gotoolsClarityConfig: any;
    }
}

function getDataAttribute(attr: string) {
    attr = `data-asw-${ attr }`;
    return document?.querySelector(`[${ attr }]`)?.getAttribute(attr)
}

function initializeTopAccessWidget() {
    let lang: string = navigator?.language;
    let position: string = getDataAttribute("position")
    let offset: string | number[] = getDataAttribute("offset");

    if(!lang) {
        lang = document?.querySelector('html')?.getAttribute('lang')?.replace(/[_-].*/, '');
    }
    if(!lang) {
        getDataAttribute("lang");
    }

    if(offset) {
        offset = offset.split(",").map(value => parseInt(value));
    }

    // Fallback to legacy gotoolsClarityConfig if the new variable was not provided.
    const gotoolsTopAccessConfig = window.gotoolsTopAccessConfig ?? window.gotoolsClarityConfig;
    console.log('GO.WEST Config', gotoolsTopAccessConfig);

    config({
        lang, 
        position,
        offset,
        primaryColor: gotoolsTopAccessConfig?.primaryColor,
        borderRadius: gotoolsTopAccessConfig?.borderRadius,
        fontFamily: gotoolsTopAccessConfig?.fontFamily
    });
}

function checkReadyState() {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        // Document is ready, call the initialization function
        initializeTopAccessWidget();

        // Remove the event listener to ensure it's only executed once
        document.removeEventListener('readystatechange', checkReadyState);
    }
}

// Use readystatechange for async support
document.addEventListener("readystatechange", checkReadyState);

