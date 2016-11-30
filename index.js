const {app,BrowserWindow}=require('electron');
const path=require('path');
let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({width: 1075, height: 600})

  mainWindow.loadURL(`file://${__dirname}/render/index.html`)

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', ()=> {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', ()=> {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function() {
  if (mainWindow === null) {
    createWindow()
  }
})
