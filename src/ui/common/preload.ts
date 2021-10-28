import {Action} from "../../electron/actions"

export {};

declare global {
    interface Window {
        electron: {
            toolbarAction: (action: Action, set: boolean) => void
        }
    }
}
