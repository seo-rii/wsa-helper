import {dialog} from 'electron'
import {apkInstallWindow} from "../window";
import {spawnSync} from 'child_process'
import path from "path";
import createNotify from "../notify";

export default function () {
    try {
        dialog.showOpenDialog({
            properties: ['openFile'],
            filters: [
                {name: 'APK File', extensions: ['apk']},
            ]
        }).then(res => {
            if (!res.canceled) {
                const installWindow = apkInstallWindow()
                setTimeout(() => {
                    spawnSync(path.join(__dirname, '..', '..', 'res', 'adb', 'adb.exe'), ['disconnect'])
                    const connectRes = spawnSync(path.join(__dirname, '..', '..', 'res', 'adb', 'adb.exe'), ['connect', 'localhost:58526'], {encoding: 'utf-8'}).output
                        .join('').replace(/\n/g, '').replace(/\r/g, '')
                    if (connectRes.includes('unable to connect')) {
                        dialog.showErrorBox('Error', 'ADB is not connected')
                        installWindow.close()
                        return
                    }
                    installWindow.webContents.send("setMessage", 1);
                    const installRes = spawnSync(path.join(__dirname, '..', '..', 'res', 'adb', 'adb.exe'), ['install', res.filePaths[0]], {encoding: 'utf-8'}).output
                        .join('').replace(/\n/g, '').replace(/\r/g, '')
                    installWindow.close();
                    createNotify('Installation Success!', 'APK has been installed successfully!')
                }, 3000)
            }
        })
    } catch (e) {

    }
}
