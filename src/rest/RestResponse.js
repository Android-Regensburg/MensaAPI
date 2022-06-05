class ResponseWrapper {

    constructor(response, canteens, description) {
        this.response = response;
        this.canteens = canteens;
        this.description = description;
        this.createdAt = new Date();
    }

    createData() {
        throw new Error("Not implemented!")
    }

    createResponseObject(data) {
        return {
            description: this.description,
            root: process.env.BASE_URL,
            createdAt: this.createdAt,
            data: data
        };
    }

    send() {
        let responseData = this.createData(),
            responseObject = this.createResponseObject(responseData);
        this.response.send(responseObject);
    }
}


class LocationListResponse extends ResponseWrapper {

    constructor(response, canteens) {
        super(response, canteens, "List of available mensa locations");
    }


    createData() {
        let data = {},
            uniqueLocation = this.canteens.filter((value, index, self) => {
                return self.indexOf(value) === index;
            });
        uniqueLocation.forEach((canteen) => {
            data[canteen.location] = `${process.env.BASE_URL}/${canteen.location}`;
        });
        return data;
    }
}

class CanteenListResponse extends ResponseWrapper {

    constructor(response, canteens, location) {
        super(response, canteens, `List of canteens at location [${location}]`);
        this.location = location;
    }

    createData() {
        let data = {},
            canteensAtLocation = this.canteens.filter((canteen) => {
                return canteen.location === this.location;
            });
        canteensAtLocation.forEach((canteen) => {
            data[canteen.name] = `${process.env.BASE_URL}/${canteen.location}/${canteen.name}`;
        });
        return data;
    }
}

class WeekMenuResponse extends ResponseWrapper {

    constructor(response, canteens, location, canteen) {
        super(response, canteens, `List of weekly menus at canteen [${canteen}] at location [${location}]`);
        this.location = location;
        this.canteen = canteen;
    }

    createData() {
        let data = {};
        data['Monday'] = `${process.env.BASE_URL}/${this.location}/${this.canteen}/Monday`;
        data['Tuesday'] = `${process.env.BASE_URL}/${this.location}/${this.canteen}/Tuesday`;
        data['Wednesday'] = `${process.env.BASE_URL}/${this.location}/${this.canteen}/Wednesday`;
        data['Thursday'] = `${process.env.BASE_URL}/${this.location}/${this.canteen}/Thursday`;
        data['Friday'] = `${process.env.BASE_URL}/${this.location}/${this.canteen}/Friday`;
        return data;
    }
}

class DailyMenuResponse extends ResponseWrapper {

    constructor(response, canteens, location, canteen, day) {
        super(response, canteens, `List of dishes at canteen [${canteen}] at location [${location}] for day [${day}]`);
        this.location = location;
        this.canteen = canteen;
        this.day = day;
    }

    createData() {
        let canteen = this.canteens.find((canteen) => {
            return canteen.location.toLowerCase() === this.location.toLowerCase() && canteen.name.toLowerCase() === this.canteen.toLowerCase();
        });
        return canteen.menu.filter((dish) => {
            return dish.day.toLowerCase() === this.day.toLowerCase();
        });
    }
}

export {
    LocationListResponse,
    CanteenListResponse,
    WeekMenuResponse,
    DailyMenuResponse
};