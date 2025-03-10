import { saveSettings } from "../../storage";
import runAccessibility from "./runAccessibility";

export default function reset() {
    saveSettings({ states: {} });

    runAccessibility();

    document?.querySelectorAll(".gotools-clarity-selected")?.forEach(el => el?.classList?.remove("gotools-clarity-selected"))
}