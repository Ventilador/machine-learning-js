{
  "targets": [
    {
      "include_dirs": [
        "<!(node -e \"require('nan')\")",
        "libs/node",
        "libs/v8"
      ],
      "target_name": "cMath",
      "sources": [ "src/mean.cpp" ]
    }
  ]
}