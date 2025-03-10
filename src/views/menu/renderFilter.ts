import addStylesheet from "../../utils/addStylesheet";
import { getSettings, getState } from "../../storage";
import { generateCSSFromConfig } from "../../utils/cssGenerator"
import { FILTERS } from "../../enum/Filters";

export default function renderFilter() {
    let { states } = getSettings();
    let { contrast } = states;

    let css = "";

    let filter = FILTERS[contrast];

    if(filter) {
        css = generateCSSFromConfig({
            ...filter,
            selector: `html.aws-filter`
        })
    }

    addStylesheet({
        css, 
        id: 'gotools-clarity-filter-style'
    });
    
    document.documentElement.classList.toggle("aws-filter", Boolean(contrast));
}