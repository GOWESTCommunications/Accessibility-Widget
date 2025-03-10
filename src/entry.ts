import config from "./config";

declare global {
    interface Window {
        gotoolsClarityConfig: any;
    }
}

function getDataAttribute(attr: string) {
    attr = `data-asw-${ attr }`;
    return document?.querySelector(`[${ attr }]`)?.getAttribute(attr)
}

function initializeClarityWidget() {
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

    const gotoolsClarityConfig = window.gotoolsClarityConfig;
    console.log('GO.WEST Config', gotoolsClarityConfig);

    config({
        lang, 
        position,
        offset,
        primaryColor: gotoolsClarityConfig?.primaryColor,
        borderRadius: gotoolsClarityConfig?.borderRadius,
        fontFamily: gotoolsClarityConfig?.fontFamily
    });
}

function checkReadyState() {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        // Document is ready, call the initialization function
        initializeClarityWidget();

        // Remove the event listener to ensure it's only executed once
        document.removeEventListener('readystatechange', checkReadyState);
    }
}

// Use readystatechange for async support
document.addEventListener("readystatechange", checkReadyState);

