const {execSync} = require('child_process');

const tryExecSync = (cmd) => {
  try{
    return execSync(cmd).toString();
  } catch(e) {
    return null;
  }
}
const leaveWithMessage = (message) => {
  console.error("\x1b[31m", message);
  process.exit(0);
}

const checkMayLeave = (isSuccess, message) => isSuccess ? null: leaveWithMessage(message);
const getFirstRunningDevice = "xcrun simctl list | grep Booted | awk -F '[()]+' '{print $2}' | head -n 1";

const checkEnvAndDependences = () => {
  checkMayLeave(require('os').platform() === 'darwin', '[error] 只能运行在macos上');
  checkMayLeave(!!tryExecSync('which screencapture'), '[error] 依赖screencapture命令, 请安装');
  checkMayLeave(!!tryExecSync('which xcrun'), '[error] 依赖xcrun 命令, 请安装');
  checkMayLeave(!!tryExecSync(getFirstRunningDevice), '[error] 没有正在运行中的模拟器请打开, 可以使用  \n"xcrun instruments -s" 查看有哪些模拟器;\n 并通过\n"xcrun instruments -w { 你的模拟器id 例如F80347B4-28F8-48E2-9C1A-00427C7CD329}"  来运行模拟器');
}

const main = () => {
  checkEnvAndDependences();
  tryExecSync(`screencapture -i /tmp/screencapture.png && xcrun simctl addmedia $(${getFirstRunningDevice}) /tmp/screencapture.png`);
  console.log("\x1b[32m", `[success] 图片已保存在模拟器相册中`)
}

main()
