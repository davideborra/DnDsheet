const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    saveData: (data, filepath) => ipcRenderer.invoke('create-file', data, filepath),
});