const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const fs = require('fs');


function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js')
    }
  });

  ipcMain.handle('create-file', (req, data, filename)=>{
    if (!data) {
        console.log("errore");
        return false;
    }
    filename = filename + ".json";
    const filePath = path.join(__dirname, 'saves', filename);
    fs.writeFileSync(filePath, data);
    console.log(filePath);
    return true;
  })
  // and load the index.html of the app.
  win.loadFile('src/index.html')
}

app.whenReady().then(createWindow);


// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS (darwin) it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  //if (process.platform !== 'darwin') {
    app.quit()
  //}
});
