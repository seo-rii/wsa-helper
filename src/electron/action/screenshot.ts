import {desktopCapturer} from 'electron'
import createNotify from '../notify'
import * as fs from "fs";
import open from 'open'
import {getPicturesFolder} from "platform-folders/src";
import * as path from "path";

export default function (wsaClientWindow: any) {
    try {
        const dest = path.join(getPicturesFolder(), new Date().toLocaleString().replace(/:/g, '-') + '.png')
        const bound = wsaClientWindow.getBounds(), width = bound.width, height = bound.height;
        desktopCapturer.getSources({
            types: ['window'],
            thumbnailSize: {height, width}
        }).then(sources => {
            for (let source of sources) {
                if (parseInt(source.id.split(':')[1]) === wsaClientWindow.id) {
                    fs.writeFile(dest, source.thumbnail.toPNG(), function (err) {
                        if (err) return console.log(err);
                        createNotify('Screenshot Saved!', 'Screenshot saved to ' + dest, 'logo', () => {
                            open(dest)
                        })
                    });
                }
            }
        })
    } catch (e) {
        console.log(e)
    }
}
