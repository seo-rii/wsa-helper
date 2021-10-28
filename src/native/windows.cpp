#include <napi.h>
#include <windows.h>


void setWindowAlwaysTop(const Napi::CallbackInfo &info) {
    Napi::Env env = info.Env();
    try {
        if (info.Length() == 0) {
            Napi::Error::New(env, "WINDOW_NOT_GIVEN").ThrowAsJavaScriptException();
            return;
        }
        HWND hWnd = (HWND) info[0].As<Napi::Number>().Int64Value();
        bool set = info[1].As<Napi::Boolean>().Value();
        if(set) SetWindowPos(hWnd, HWND_TOPMOST, 0, 0, 0, 0, SWP_NOSIZE | SWP_NOMOVE);
        else SetWindowPos(hWnd, HWND_NOTOPMOST, 0, 0, 0, 0, SWP_NOSIZE | SWP_NOMOVE);
    } catch (const char *ex) {
        Napi::Error::New(env, "UNKNOWN").ThrowAsJavaScriptException();
    }
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set(Napi::String::New(env, "setWindowAlwaysTop"),
                Napi::Function::New(env, setWindowAlwaysTop));
    return exports;
}

NODE_API_MODULE(vibrancy, Init)
