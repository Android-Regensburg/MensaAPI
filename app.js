import 'dotenv/config';

import CanteenProvider from './src/data/CanteenProvider.js';
import RestServer from './src/rest/RestServer.js';

let server,
    updater;

async function update() {
    let canteens = await CanteenProvider.update();
    server.setCanteenData(canteens);
    console.log("Update completed!");
}

async function start() {
    server = new RestServer();
    await update();
    updater = setInterval(update, process.env.UPDATE_INTERVAL);
    server.start();
}

start();