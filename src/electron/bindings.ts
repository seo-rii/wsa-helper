export interface Bindings {
    setWindowAlwaysTop(hWnd: number, set: boolean): void,

    takeScreenshot(hWnd: number, dest: string): void,
}

const wrapper: Bindings = require('bindings')('wsah-native')

export default wrapper
