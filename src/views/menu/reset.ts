import { saveSettings } from "../../storage";
import runAccessibility from "./runAccessibility";

export default function reset() {
    saveSettings({ states: {} });

    runAccessibility();

    document?.querySelectorAll(".gotools-topaccess-selected")?.forEach(el => el?.classList?.remove("gotools-topaccess-selected"))
}