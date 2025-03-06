export default function renderButtons(buttons, btnClass?:string) {
    let _html = '';

    for(var i = buttons.length; i--;) {
        let x = buttons[i];

        _html += `
            <button class="go-aw-btn ${ btnClass || '' }" type="button" data-key="${ x.key }" title="${ x.label }">
                ${ x.icon }
                <span class="go-aw-translate">${ x.label }</span>
            </button>
        `;
    }
    
    return _html;
}