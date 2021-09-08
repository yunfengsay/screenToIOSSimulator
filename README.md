# MacOs下截图并自动保存到ios模拟器

## 安装
```bash
npm i screentoios -g
```
## 使用方法
```bash
screenToIos
```
## 替代shell脚本
```
screencapture -i /tmp/screencapture.png && xcrun simctl addmedia $(xcrun simctl list | grep Booted | awk -F '[()]+' '{print $2}' | head -n 1) /tmp/screencapture.png
```
