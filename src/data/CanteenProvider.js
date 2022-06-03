import fs from 'fs';

import Canteen from './Canteen.js';
import UpdateMenuRequest from '../api/UpdateMenuRequest.js';

async function loadCanteensFromFile(file) {
    let json = fs.readFileSync(file),
        canteensRaw = JSON.parse(json);
    return canteensRaw.map((canteen) => {
        let updateMenuRequest = new UpdateMenuRequest(canteen.url);
        return new Canteen(canteen.location, canteen.school, canteen.name, updateMenuRequest);
    });
}

class CanteenProvider {


    static async update() {
        let canteens = await loadCanteensFromFile(process.env.CANTEEN_LIST);
        for (let i = 0; i < canteens.length; i++) {
            await canteens[i].update();
        }
        return canteens;
    }

}

export default CanteenProvider;