{
  "targets": [
    {
      "target_name": "wsah-native",
      "conditions":[
        ["OS=='win'", {
          "sources": [
            "src/native/windows.cpp"
          ]
        }]
      ],
      "cflags_cc": [
        "-O3",
        "-std=c++17"
      ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")"
      ],
      "defines": [
        "NAPI_DISABLE_CPP_EXCEPTIONS"
      ],
      "libraries": [
      	"dwmapi.lib"
      ]
    }
  ]
}
