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

    const $menu: HTMLElement = $container.querySelector(".gotools-topaccess-menu");

    if(position?.includes("right")) {
        $menu.style.right = '0px';
        $menu.style.left = 'auto';
    }

    $menu.querySelector(".content").innerHTML = renderButtons(ContentButtons);
    $menu.querySelector(".tools").innerHTML = renderButtons(ToolButtons, 'gotools-topaccess-tools');
    $menu.querySelector(".contrast").innerHTML = renderButtons(FilterButtons, 'gotools-topaccess-filter');

    $container.querySelectorAll('.gotools-topaccess-menu-close, .gotools-topaccess-overlay').forEach((el: HTMLElement) => {
        el.addEventListener('click', () => {
            toggle($container, false);
        });
        el.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key === 'Enter' || e.keyCode === 13) {
                toggle($container, false);
            }
        });
    });

    $menu.querySelectorAll(".gotools-topaccess-adjust-font div[role='button']").forEach((el: HTMLElement) => {
        el.addEventListener("click", () => {
            const margin = 0.1;

            let fontSize = getState("fontSize") ?? 1;
            if(el.classList.contains('gotools-topaccess-minus')) {
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

        el.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.key === 'Enter' || e.keyCode === 13) {
            const margin = 0.1;

            let fontSize = getState("fontSize") ?? 1;
            if(el.classList.contains('gotools-topaccess-minus')) {
                fontSize -= margin;
            } else {
                fontSize += margin;
            }

            fontSize = Math.max(fontSize, 0.1);
            fontSize = Math.min(fontSize, 2);
            fontSize = Number(fontSize.toFixed(2));
            
            adjustFontSize(fontSize || 1);

            saveState({ fontSize });
            }
        });
    });

    $menu.querySelectorAll(".gotools-topaccess-btn").forEach((el: HTMLElement) => {
        el.addEventListener("click", () => {
            let key = el.dataset.key;

            let isSelected = !el.classList.contains("gotools-topaccess-selected");

            if(el.classList.contains('gotools-topaccess-filter')) {
                $menu.querySelectorAll('.gotools-topaccess-filter').forEach((el: HTMLElement) => {
                    el.classList.remove('gotools-topaccess-selected');
                });

                saveState({
                    contrast: isSelected ? key : false
                });

                if(isSelected) {
                    el.classList.add('gotools-topaccess-selected');
                }

                renderFilter();
            } else {
                el.classList.toggle('gotools-topaccess-selected', isSelected);

                saveState({
                    [key]: isSelected
                });

                renderTools();
            }
        });
    });

    const $resetBtn = $menu.querySelector('.gotools-topaccess-menu-reset');
    $resetBtn?.addEventListener('click', () => {
        reset();
    });
    $resetBtn?.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            reset();
        }
    });

    
    let settings = getSettings();

    let fontSize = Number(settings?.states?.fontSize) || 1;

    if(fontSize != 1) {
        $menu.querySelector(".gotools-topaccess-amount").innerHTML = `${ fontSize * 100 }%`;
    }

    let $lang: HTMLSelectElement = $menu.querySelector("#gotools-topaccess-language");
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
                $menu.querySelector(`.gotools-topaccess-btn[data-key="${ selector }"]`)?.classList?.add("gotools-topaccess-selected")
            }
        }
    }

    container.appendChild($container);

    return $container;
}