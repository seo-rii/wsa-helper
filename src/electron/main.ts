import {createToolbarWindow} from './window'
import {app, ipcMain} from "electron";
import {windowManager} from "node-window-manager"
import os from 'os'
import {Action} from "./actions";
import {alwaysOnTop, screenshot, apkInstall} from "./action";

let toolbarWindow, lastFocusedWSAClient;

function getNativeWindowHandle_Int(win) {
    let hbuf = win.getNativeWindowHandle()

    if (os.endianness() == "LE") {
        return hbuf.readInt32LE()
    } else {
        return hbuf.readInt32BE()
    }
}

function init() {
    toolbarWindow = createToolbarWindow();
    let windowHandle = getNativeWindowHandle_Int(toolbarWindow)
    setInterval(() => {
        const currentWindow = windowManager.getActiveWindow();
        if (currentWindow.path.split('\\').slice(-1)[0] === 'WsaClient.exe') {
            lastFocusedWSAClient = currentWindow
            const currentWindowBound = currentWindow.getBounds()
            toolbarWindow.setPosition(((currentWindowBound.x ?? 0) + (currentWindowBound.width ?? 0)) + 10, currentWindowBound.y)
            toolbarWindow.setSize(100, (currentWindowBound.height ?? 0) - 3)
            toolbarWindow.showInactive()
        } else if (currentWindow.id === windowHandle) {
            toolbarWindow.showInactive()
        } else {
            toolbarWindow.hide()
        }
    }, 1)
}

app.on('ready', init);

ipcMain.on("toolbarAction", (e, data: { action: Action, data?: any }) => {
    if (!lastFocusedWSAClient) return
    switch (data.action) {
        case Action.ALWAYSONTOP:
            alwaysOnTop(lastFocusedWSAClient, data.data)
            break
        case Action.SCREENSHOT:
            screenshot(lastFocusedWSAClient)
            break
        case Action.APKINSTALL:
            apkInstall()
            break
    }
});
