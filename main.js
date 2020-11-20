const { app, BrowserWindow, Menu } = require('electron');

// set env
process.env.NODE_ENV = 'development';

const isDev = process.env.NOD !== 'production' ? true : false;
const isMac = process.platform === 'darwin' ? true : false;

let mainWindow;

function createMainWindow() {
	mainWindow = new BrowserWindow({
		title: 'Image Shrink',
		width: 500,
		height: 600,
		icon: `${__dirname}/assets/Icon_256x256.png`,
		resizable: isDev ? true : false
	});

	mainWindow.loadURL(`file://${__dirname}/app/index.html`);
	// mainWindow.loadFile('./app/index.html'); dev
}

app.on('ready', () => {
	createMainWindow();

	const mainMenu = Menu.buildFromTemplate(menu);
	Menu.setApplicationMenu(mainMenu);

	mainWindow.on('closed', () => (mainWindow = null));
});

const menu = [
	...(isMac ? [{ role: 'appMenu' }] : []),
	{
		label: 'File',
		submenu: [
			{
				label: 'Quit',
				click: () => app.quit()
			}
		]
	}
];

app.on('window-all-closed', () => {
	if (!isMac) {
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createMainWindow();
	}
});
