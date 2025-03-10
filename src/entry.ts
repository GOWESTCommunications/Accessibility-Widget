import config from "./config";

declare global {
    interface Window {
        gowestAccessibilityConfig: any;
    }
}

function getDataAttribute(attr: string) {
    attr = `data-asw-${ attr }`;
    return document?.querySelector(`[${ attr }]`)?.getAttribute(attr)
}

function initializeSienna() {
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

    const gowestAccessibilityConfig = window.gowestAccessibilityConfig;
    console.log('GO.WEST Config', gowestAccessibilityConfig);

    config({
        lang, 
        position,
        offset,
        primaryColor: gowestAccessibilityConfig?.primaryColor,
        borderRadius: gowestAccessibilityConfig?.borderRadius,
        fontFamily: gowestAccessibilityConfig?.fontFamily
    });
}

function checkReadyState() {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        // Document is ready, call the initialization function
        initializeSienna();

        // Remove the event listener to ensure it's only executed once
        document.removeEventListener('readystatechange', checkReadyState);
    }
}

// Use readystatechange for async support
document.addEventListener("readystatechange", checkReadyState);

