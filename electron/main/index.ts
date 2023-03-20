import { app, BrowserWindow } from 'electron';
import { join } from 'path';
import fs from 'fs';
import { electronApp, is, optimizer } from '@electron-toolkit/utils';
import ipc from './ipc';

process.env.DIST_ELECTRON = join(__dirname, '../');
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist-electron/renderer');
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, '../public')
  : process.env.DIST;

const preload = join(__dirname, '../preload/index.js');
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, 'index.html');

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    minWidth: 700,
    minHeight: 400,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      webSecurity: true,
      contextIsolation: false,
      nodeIntegration: true,
      preload,
    },
  });

  global.sharedObject = {
    win: mainWindow,
  };

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  // mainWindow.webContents.setWindowOpenHandler((details) => {
  //   shell.openExternal(details.url);
  //   return { action: 'deny' };
  // });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && url) {
    mainWindow.webContents.openDevTools();
    mainWindow.loadURL(url);
  } else {
    mainWindow.loadFile(indexHtml);
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron');

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  if (!fs.existsSync('D:/CAJ2PDF')) {
    fs.mkdirSync('D:/CAJ2PDF');
  }

  ipc();

  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
