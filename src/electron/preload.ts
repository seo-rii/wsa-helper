import {contextBridge, ipcRenderer} from 'electron'
import {Action} from './actions'
import Bridge from "../ui/common/preload";

contextBridge.exposeInMainWorld(
    'electron',
    {
        toolbar: {
            toolbarAction: (action: Action, data?: any) => ipcRenderer.send('toolbarAction', {action, data}),
            setToolbarWidth: (width: number) => ipcRenderer.send('setToolbarWidth', width),
            openWSASetting: () => ipcRenderer.send('toolbarAction', {action: Action.OPENWSASETTING}),
        },
        apkInstall: {
            onMessage: (callback: (event, stage: number) => void) => {
                ipcRenderer.on('setMessage', callback)
            },
        }
    } as Bridge
)
