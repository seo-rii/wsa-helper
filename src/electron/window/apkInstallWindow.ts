import {BrowserWindow} from "electron-acrylic-window";
import path from "path";
import url from "url";

export default function(dev = false) {
    let win;
    win = new BrowserWindow({
        width: 400,
        height: 200,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        },
        icon: path.join(__dirname, '..', '..', 'res', 'logo.png'),
        frame: false,
        backgroundColor: '#00000000',
        skipTaskbar: true
    });
    win.loadURL(url.format({
        pathname: path.join(__dirname, '..', 'ui', 'apkInstall', 'index.html'),
        protocol: 'file:',
        slashes: true
    }));
    win.setAlwaysOnTop(true, 'floating');
    if (dev) win.webContents.openDevTools({mode: "detach"});

    return win
}
