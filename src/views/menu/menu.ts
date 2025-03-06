// @ts-ignore
import template from "./menu.html";

import FilterButtons from "./FilterButtons";
import ContentButtons from "./ContentButtons";
import ToolButtons from "../../enum/TOOL_PRESETS";

import renderButtons from "./renderButtons";
import toggle from "../../utils/toggle";
import adjustFontSize from "../../tools/adjustFontSize";
import renderTools from "./renderTools";
import { getSettings, getState, saveSettings, saveState } from "../../storage";
import reset from "./reset";
import renderFilter from "./renderFilter";
import translateMenu from "./translateMenu";

import { ILanguage, LANGUAGES } from "../../enum/Languages";

export interface IRenderMenuArgs {
    container: HTMLElement,
    position?: string,
    lang?: string
}

export function renderMenu({
    container,
    position,
    ...options
}: IRenderMenuArgs) {
    const $container: HTMLElement = document.createElement("div");
    $container.innerHTML = template;

    const $menu: HTMLElement = $container.querySelector(".go-aw-menu");

    if(position?.includes("right")) {
        $menu.style.right = '0px';
        $menu.style.left = 'auto';
    }

    $menu.querySelector(".content").innerHTML = renderButtons(ContentButtons);
    $menu.querySelector(".tools").innerHTML = renderButtons(ToolButtons, 'go-aw-tools');
    $menu.querySelector(".contrast").innerHTML = renderButtons(FilterButtons, 'go-aw-filter');

    $container.querySelectorAll('.go-aw-menu-close, .go-aw-overlay').forEach((el: HTMLElement) => {
        el.addEventListener('click', () => {
            toggle($container, false)
        });
    })

    $menu.querySelectorAll(".go-aw-adjust-font div[role='button']").forEach((el: HTMLElement) => {
        el.addEventListener("click", () => {
            const margin = 0.1;

            let fontSize = getState("fontSize") ?? 1;
            if(el.classList.contains('go-aw-minus')) {
                fontSize -= margin;
            } else {
                fontSize += margin;
            }

            fontSize = Math.max(fontSize, 0.1);
            fontSize = Math.min(fontSize, 2);
            fontSize = Number(fontSize.toFixed(2));
            
            adjustFontSize(fontSize || 1);

            saveState({ fontSize });
        });
    });

    $menu.querySelectorAll(".go-aw-btn").forEach((el: HTMLElement) => {
        el.addEventListener("click", () => {
            let key = el.dataset.key;

            let isSelected = !el.classList.contains("go-aw-selected");

            if(el.classList.contains('go-aw-filter')) {
                $menu.querySelectorAll('.go-aw-filter').forEach((el: HTMLElement) => {
                    el.classList.remove('go-aw-selected');
                });

                saveState({
                    contrast: isSelected ? key : false
                });

                if(isSelected) {
                    el.classList.add('go-aw-selected');
                }

                renderFilter();
            } else {
                el.classList.toggle('go-aw-selected', isSelected);

                saveState({
                    [key]: isSelected
                });

                renderTools();
            }
        });
    });

    $menu.querySelector('.go-aw-menu-reset')?.addEventListener('click', () => {
        reset();
    });

    
    let settings = getSettings();

    let fontSize = Number(settings?.states?.fontSize) || 1;

    if(fontSize != 1) {
        $menu.querySelector(".go-aw-amount").innerHTML = `${ fontSize * 100 }%`;
    }

    let $lang: HTMLSelectElement = $menu.querySelector("#go-aw-language");
    $lang.innerHTML = LANGUAGES.map((lang: ILanguage) => `<option value="${lang.code}">${lang.label}</option>`).join('');

    if(settings.lang !== options.lang) {
        saveSettings({
            lang: options.lang
        });
    }
    
    $lang.value = options?.lang || "en";

    $lang?.addEventListener("change", () => {
        saveSettings({
            lang: $lang.value
        });

        translateMenu(container);
    });

    translateMenu($menu);
    
    if(settings.states) {
        for(let key in settings.states) {
            if(settings.states[key] && key !== "fontSize") {
                let selector = key === "contrast" ? settings.states[key] : key;
                $menu.querySelector(`.go-aw-btn[data-key="${ selector }"]`)?.classList?.add("go-aw-selected")
            }
        }
    }

    container.appendChild($container);

    return $container;
}