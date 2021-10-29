import {Action} from "../../electron/actions"

interface Bridge {
    toolbar: {
        toolbarAction: (action: Action, data?: any) => void
        setToolbarWidth: (width: number) => void
        openWSASetting: () => void
    }
    apkInstall: { onMessage: (callback: (event, stage: number) => void) => void }
}

declare global {
    interface Window {
        electron: Bridge
    }
}

export default Bridge
