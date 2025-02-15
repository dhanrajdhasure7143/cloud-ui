const { app, BrowserWindow } = require('electron');
let win;

if (handleSquirrelEvent()) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
}


function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({ width: 800, height: 600, icon: __dirname + '/epsoft.ico' });
    // and load the index.html of the app. 
    win.loadFile(`./dist/aiotal/index.html`);
    // Open the DevTools.
    //win.webContents.openDevTools();

    //close Devtools
    //win.webContents.on("devtools-opened", () => { win.webContents.closeDevTools(); });

    win.webContents.on('crashed', (e) => {
        app.relaunch();
        app.quit()
    });

    win.webContents.on('unresponsive', (e) => {
        app.relaunch();
        app.quit()
    });


    win.on('close', function (e) {
        var choice = require('electron').dialog.showMessageBox(this,
            {
                type: 'question',
                buttons: ['Yes', 'No'],
                title: 'Confirm',
                message: 'Are you sure you want to quit?'
            });
        if (choice == 1) {
            e.preventDefault();
        }
    });

    // Emitted when the window is closed.
    win.on('closed', () => {
        win = null
    })
};

function handleSquirrelEvent() {
    if (process.argv.length === 1) {
        return false;
    }

    const ChildProcess = require('child_process');
    const path = require('path');

    const appFolder = path.resolve(process.execPath, '..');
    const rootAtomFolder = path.resolve(appFolder, '..');
    const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
    const exeName = path.basename(process.execPath);

    const spawn = function (command, args) {
        let spawnedProcess, error;

        try {
            spawnedProcess = ChildProcess.spawn(command, args, { detached: true });
        } catch (error) { }

        return spawnedProcess;
    };

    const spawnUpdate = function (args) {
        return spawn(updateDotExe, args);
    };

    const squirrelEvent = process.argv[1];
    switch (squirrelEvent) {
        case '--squirrel-install':
        case '--squirrel-updated':
            // Optionally do things such as:
            // - Add your .exe to the PATH
            // - Write to the registry for things like file associations and
            //   explorer context menus

            // Install desktop and start menu shortcuts
            spawnUpdate(['--createShortcut', exeName]);

            setTimeout(app.quit, 1000);
            return true;

        case '--squirrel-uninstall':
            // Undo anything you did in the --squirrel-install and
            // --squirrel-updated handlers

            // Remove desktop and start menu shortcuts
            spawnUpdate(['--removeShortcut', exeName]);

            setTimeout(app.quit, 1000);
            return true;

        case '--squirrel-obsolete':
            // This is called on the outgoing version of your app before
            // we update to the new version - it's the opposite of
            // --squirrel-updated

            app.quit();
            return true;
    }
};
// This method will be called when Electron has finished   
// initialization and is ready to create browser windows.   
// Some APIs can only be used after this event occurs.   
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {

    // On macOS it is common for applications and their menu bar     
    // to stay active until the user quits explicitly with Cmd + Q     
    if (process.platform !== 'darwin') { app.quit() }
});
app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the     
    // dock icon is clicked and there are no other windows open.     
    if (win === null) { createWindow() }
});  