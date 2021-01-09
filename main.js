// Modules to control application life and create native browser window
const {app, BrowserWindow, autoUpdater, dialog } = require('electron')
const path = require('path')
var ua = require('universal-analytics')

// Icon
const icon_dir = '/build/'

//Universal Analytics
var visitor = ua('UA-42116823-10')
visitor.pageview("/").send()

// autoUpdate
// const server = "miniplayer.now.sh"
// const feed = `${server}/update/${process.platform}/${app.getVersion()}`

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 470,
    //width: 1200,
    height: 100,
    //height: 800,
    frame: false,
    transparent: true,
    // vibrancy: 'dark',
    titleBarStyle: 'hidden',
    titleBarStyle: 'hiddenInset',
    titleBarStyle: 'customButtonsOnHover',
    fullScreenable: false,
    maximizable: false,
    resizable: false,
    icon: path.join(__dirname, icon_dir, 'icon.png'),
    webPreferences: {
      nodeIntegration: true
    }
  })

  // set default position instead of center
  mainWindow.setPosition(100, 100)

  // always on top
  mainWindow.setAlwaysOnTop(true, 'screen')

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
/*
// Autoupdate
autoUpdater.setFeedURL(feed)

// Check for updates
setInterval(() => {
  autoUpdater.checkForUpdates()
}, 960000)

// Dialog and apply the updates
autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: 'A new version has been downloaded. Restart the application to apply the updates.'
  }

  dialog.showMessageBox(dialogOpts, (response) => {
    if (response === 0) autoUpdater.quitAndInstall()
  })
})

// if error
autoUpdater.on('error', message => {
  console.error('There was a problem updating the application')
  console.error(message)
})
*/