import { injectToolCSS } from "../utils/cssGenerator";
import IToolConfig from "../types/IToolConfig";
import { TEXT_SELECTORS } from "../enum/Selectors";

export const readableFontConfig: IToolConfig = {
    id: "readable-font",
    selector: `html`,
    childrenSelector: ['', '*:not(.material-icons,.fa)', ...TEXT_SELECTORS],
    styles: {
        'font-family': 'OpenDyslexic3,Comic Sans MS,Arial,Helvetica,sans-serif'
    },
    css: `
        @font-face {
            font-family: OpenDyslexic3;
            src: url("https://tools.go-west.at/fonts/OpenDyslexic3-Regular.woff2") format("woff2");
        }
    `
}

export default function readableFont(enable=false) {
    injectToolCSS({
        ...readableFontConfig,
        enable
    })
}