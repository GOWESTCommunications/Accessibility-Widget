import { getSettings, saveSettings } from "./storage";
import runAccessibility from "./views/menu/runAccessibility";
import { renderWidget } from "./views/widget/widget"

export interface GoAccessibilitySettings {
    lang?: any,
    position?: any | 'bottom-right' | 'bottom-left' | 'top-left' | 'top-right' | 'center-left' | 'center-right',
    footer?: any,
    offset?: any
    primaryColor?: string,
    gradientColor?: string,
    borderRadius?: number,
    fontFamily?: string,
}

export const DEFAULT_OPTIONS: GoAccessibilitySettings = {
    lang: 'en',
    position: 'bottom-left',
    primaryColor: '#0079E3',
    gradientColor: 'linear-gradient(175deg, #00AFFD 0%, #004ACC 100%)',
    borderRadius: 12,
    fontFamily: 'inherit'
}

export default function config(args?: GoAccessibilitySettings) {
     

    // try {
    //     let settings = getSettings(false);

    //     options = {
    //         ...options,
    //         ...settings,
    //     }
        
    //     runAccessibility();
    // } catch(e) {
    //     // silent error
    // }
    //TODO: implement save settings

    if (args?.primaryColor !== undefined && args?.primaryColor !== null) {
        args.gradientColor = args.primaryColor;
    }

    let options = {
        ...DEFAULT_OPTIONS,
        ...Object.keys(args || {}).reduce((acc, key) => {
            if (args[key] !== undefined && args[key] !== null) {
                acc[key] = args[key];
            }
            return acc;
        }, {})
    }

    console.log('Options:', options)

    
    saveSettings(options);

    renderWidget(options);
}