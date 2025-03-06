import { injectToolCSS } from "../utils/cssGenerator";
import { LINKS_SELECOTR } from "../enum/Selectors";
import IToolConfig from "../types/IToolConfig";

export const highlightLinksConfig: IToolConfig = {
    id: "highlight-links",
    selector: `html`,
    childrenSelector: LINKS_SELECOTR,
    styles: {
        'outline': '2px dashed rgb(0, 150, 255)',
        'outline-offset': '2px'
    }
}

export default function highlightLinks(enable=false) {
    injectToolCSS({
        ...highlightLinksConfig,
        enable
    })
}