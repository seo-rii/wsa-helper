import {createToolbarWindow} from './window'
import {app, ipcMain} from "electron";
import {windowManager} from "node-window-manager"
import os from 'os'
import {Action} from "./actions";
import {alwaysOnTop, screenshot, apkInstall} from "./action";
import {exec} from 'child_process'
import * as path from "path";

let toolbarWindow, lastFocusedWSAClient, toolbarWidth = 100, lostFocusTime, wsaPath;

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
            wsaPath = currentWindow.path
            lastFocusedWSAClient = currentWindow
            const currentWindowBound = currentWindow.getBounds()
            toolbarWindow.setPosition(((currentWindowBound.x ?? 0) + (currentWindowBound.width ?? 0)) + 10, currentWindowBound.y)
            toolbarWindow.setSize(toolbarWidth, (currentWindowBound.height ?? 0) - 3)
            toolbarWindow.showInactive()
            lostFocusTime = 0
        } else if (currentWindow.id === windowHandle) {
            toolbarWindow.showInactive()
            lostFocusTime = 0
        } else {
            if (!lostFocusTime) lostFocusTime = Date.now()
            if (Date.now() - lostFocusTime > 100) toolbarWindow.hide()
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
        case Action.OPENWSASETTING:
            exec('explorer.exe shell:appsFolder\\MicrosoftCorporationII.WindowsSubsystemForAndroid_8wekyb3d8bbwe!MicrosoftCorporationII.WindowsSubsystemForAndroid')
            break
    }
});

ipcMain.on('setToolbarWidth', (e, width: number) => {
    toolbarWidth = width
})
