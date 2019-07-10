var electronInstaller = require('electron-winstaller');
// In this case, we can use relative paths
var settings = {
    // Specify the folder where the built app is located
    appDirectory: './ez-bot-win32-x64',
    // Specify the existing folder where
    outputDirectory: './ez-bot-win32-x64-installers',
    // The name of the Author of the app (the name of your company)
    authors: 'EpSoft Solutions Pvt Ltd',
    exe: './ez-bot.exe',
    description: 'cloud'
};
resultPromise = electronInstaller.createWindowsInstaller(settings);
resultPromise.then(() => {
    console.log("The installers of your application were succesfully created !");
}, (e) => {
    console.log(`Well, sometimes you are not so lucky: ${e.message}`)
});