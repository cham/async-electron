const { app, BrowserWindow } = require('electron')
const url = require('url')
const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow()

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:'
  }))

  win.on('closed', () => {
    app.quit()
  })
}

app.on('ready', createWindow)
