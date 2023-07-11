#!/bin/bash
echo "Building app for Windows, Linux and OSX"
#npx electron-packager . --overwrite --platform=win32 --arch=x64 --out release-builds --icon=icon.ico
#npx electron-packager . --overwrite --platform=linux --arch=x64 --out release-builds --icon=icon.icns
npx electron-packager . --overwrite --platform=darwin --arch=arm64 --out release-builds --icon=icon.icns
