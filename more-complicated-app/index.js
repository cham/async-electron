const { app, BrowserWindow, protocol, ipcMain } = require('electron')
const url = require('url')
const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow()

  win.on('closed', () => {
    app.quit()
  })

  protocol.interceptFileProtocol('file', (request, callback) => {
    let url = request.url.substr('file'.length + 1)
    url = path.join(__dirname, 'dist', url)
    url = path.normalize(url)
    callback({ path: url })
  }, (err) => {
    if (err) console.error('Failed to register protocol')
  })

  win.loadURL(url.format({
    pathname: 'index.html',
    protocol: 'file:',
    slashes: true
  }))
}

app.on('ready', createWindow)
