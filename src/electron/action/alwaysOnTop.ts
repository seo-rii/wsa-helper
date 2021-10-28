import native from '../bindings'

export default function (wsaClientWindow: any, set: boolean) {
    try {
        native.setWindowAlwaysTop(wsaClientWindow.id, set)
    } catch (e) {

    }
}
