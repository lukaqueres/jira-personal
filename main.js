const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron')
require('dotenv').config();
const { Version3Client } = require('jira.js')

/*
app.setUserTasks([
  {
    program: process.execPath,
    arguments: '--new-window',
    iconPath: process.execPath,
    iconIndex: 0,
    title: 'New Window',
    description: 'Create a new window'
  }
])
*/
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#2f3241',
      symbolColor: '#74b1be',
      height: 30
    },
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

ipcMain.handle('dark-mode:toggle', () => {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = 'light'
  } else {
    nativeTheme.themeSource = 'dark'
  }
  return nativeTheme.shouldUseDarkColors
})

ipcMain.handle('dark-mode:system', () => {
  nativeTheme.themeSource = 'system'
})

app.whenReady().then(() => {
  createWindow()
  createLoginwindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})




const client = new Version3Client({
  host: 'https://jira.cloudferro.com/',
  authentication: {
    personalAccessToken: process.env.TOKEN,
  },
});

const createLoginwindow = () => {
  const loginwin = new BrowserWindow({
      width: 500,
      height: 600,
      frame: false,
      titleBarStyle: 'hidden',
      // transparent: true,
      minHeight: 600,
      minWidth: 500,
      webPreferences: {
          preload: path.join(__dirname, 'preload.js'),
      },
      
  });

  loginwin.loadFile('login.html');
  // loginwin.setResizable(false);
}


const projects = client

console.log("LOOOOOOOOOOOOOL")
console.log(client.myself.client.avatars)