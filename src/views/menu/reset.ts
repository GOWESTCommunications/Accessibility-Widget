import { saveSettings } from "../../storage";
import runAccessibility from "./runAccessibility";

export default function reset() {
    saveSettings({ states: {} });

    runAccessibility();

    document?.querySelectorAll(".go-aw-selected")?.forEach(el => el?.classList?.remove("go-aw-selected"))
}