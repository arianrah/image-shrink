const { app, BrowserWindow, Menu, globalShortcut } = require('electron');

// set env
process.env.NODE_ENV = 'development';

const isDev = process.env.NOD !== 'production' ? true : false;
const isMac = process.platform === 'darwin' ? true : false;

let mainWindow;
let aboutWindow;

function createMainWindow() {
	mainWindow = new BrowserWindow({
		title: 'Image Shrink',
		width: 500,
		height: 600,
		backgroundColor: 'white',
		icon: `${__dirname}/assets/Icon_256x256.png`,
		resizable: isDev ? true : false
	});

	mainWindow.loadURL(`file://${__dirname}/app/index.html`);
	// mainWindow.loadFile('./app/index.html'); dev
}

function createAboutWindow() {
	aboutWindow = new BrowserWindow({
		title: 'About Image Shrink',
		width: 300,
		height: 300,
		backgroundColor: 'white',
		icon: `${__dirname}/assets/Icon_256x256.png`,
		resizable: false
	});

	aboutWindow.loadURL(`file://${__dirname}/app/about.html`);
	// aboutWindow.loadFile('./app/index.html'); dev
}

app.on('ready', () => {
	createMainWindow();

	const mainMenu = Menu.buildFromTemplate(menu);
	Menu.setApplicationMenu(mainMenu);

	// global shortcuts disabled because of dev menu
	// globalShortcut.register('CmdOrCtrl+R', () => mainWindow.reload());
	// globalShortcut.register(isMac ? 'Command+Alt+I' : 'Ctrl+Shift+I', () =>
	// 	mainWindow.toggleDevTools()
	// );

	mainWindow.on('closed', () => (mainWindow = null));
});

const menu = [
	...(isMac
		? [
				{
					label: app.name,
					submenu: [
						{
							label: 'About',
							click: createAboutWindow
						}
					]
				}
		  ]
		: []),
	{
		role: 'fileMenu'
	},
	...(!isMac
		? [
				{
					label: 'Help',
					submenu: [
						{
							label: 'About',
							click: createAboutWindow
						}
					]
				}
		  ]
		: []),
	...(isDev
		? [
				{
					label: 'Developer',
					submenu: [
						{ role: 'reload' },
						{ role: 'forcereload' },
						{ type: 'separator' },
						{ role: 'toggledevtools' }
					]
				}
		  ]
		: [])
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
