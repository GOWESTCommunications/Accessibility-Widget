export function getCookie(cname: string): string | null {
    const name = cname + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) === 0) {
            try {
                return decodeURIComponent(c.substring(name.length));
            } catch (e) {
                console.warn("Cookie value malformed:", c);
                return null;
            }
        }
    }
    return null;
}

export function setCookie(cname: string, cvalue: any, exdays: number = 365) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = `${cname}=${encodeURIComponent(cvalue)};${expires};path=/`;
}