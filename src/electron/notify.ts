import {Notification} from 'electron'
import path from "path";

export default function createNotify(title: string, body: string, icon = 'logo', cb?: () => void) {
    let notification = new Notification({
        title: title,
        body: body,
        icon: path.join(__dirname, '..', '..', 'res', 'img', icon + '.ico')
    });
    if (cb) notification.on('click', cb)
    notification.show();
}
