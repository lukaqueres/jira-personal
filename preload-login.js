const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('authorize', {
    login: (data) => ipcRenderer.send('authorize:login', data),
    check: (data) => ipcRenderer.send('authorize:check', data),
    checked: (response) => ipcRenderer.on('authorize:checked', response)
})