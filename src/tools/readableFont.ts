import { injectToolCSS } from "../utils/cssGenerator";
import IToolConfig from "../types/IToolConfig";
import { TEXT_SELECTORS } from "../enum/Selectors";

export const readableFontConfig: IToolConfig = {
    id: "readable-font",
    selector: `html`,
    childrenSelector: ['', '*:not(.material-icons,.fa)', ...TEXT_SELECTORS],
    styles: {
        'font-family': 'OpenDyslexic,Comic Sans MS,Arial,Helvetica,sans-serif'
    },
    css: `
        @font-face {
            font-family: OpenDyslexic;
            src: url("https://cdn.go-west.tools/widgets/accessibility/font/opendyslexic") format("woff2");
        }
    `
}

export default function readableFont(enable=false) {
    injectToolCSS({
        ...readableFontConfig,
        enable
    })
}