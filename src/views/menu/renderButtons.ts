export default function renderButtons(buttons, btnClass?:string) {
    let _html = '';

    for(var i = buttons.length; i--;) {
        let x = buttons[i];

        _html += `
            <button class="gotools-clarity-btn ${ btnClass || '' }" type="button" data-key="${ x.key }" title="${ x.label }">
                ${ x.icon }
                <span class="gotools-clarity-translate">${ x.label }</span>
            </button>
        `;
    }
    
    return _html;
}