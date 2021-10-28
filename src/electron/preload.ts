import {contextBridge, ipcRenderer} from 'electron'
import {Action} from './actions'

contextBridge.exposeInMainWorld(
    'electron',
    {
        toolbarAction: (action: Action, set: boolean) => ipcRenderer.send('toolbarAction', {action, set}),
    }
)
