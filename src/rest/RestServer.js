import express from 'express';
import {
    LocationListResponse,
    CanteenListResponse,
    WeekMenuResponse,
    DailyMenuResponse
} from './RestResponse.js';

let canteenData = [];

function onLocationListRequested(request, response) {
    let responseWrapper = new LocationListResponse(response, canteenData);
    responseWrapper.send();
}

function onCanteenListRequested(request, response) {
    let responseWrapper = new CanteenListResponse(response, canteenData, request.params.location);
    responseWrapper.send();
}

function onWeekMenuRequested(request, response) {
    let responseWrapper = new WeekMenuResponse(response, canteenData, request.params.location, request.params.canteen);
    responseWrapper.send();
}

function onDayMenuRequested(request, response) {
    let responseWrapper = new DailyMenuResponse(response, canteenData, request.params.location, request.params.canteen, request.params.day);
    responseWrapper.send();
}


class RestServer {

    constructor() {
        this.port = process.env.PORT;
        this.app = express();
        this.app.get("/", onLocationListRequested);
        this.app.get("/:location", onCanteenListRequested);
        this.app.get("/:location/:canteen", onWeekMenuRequested);
        this.app.get("/:location/:canteen/:day", onDayMenuRequested);
    }

    setCanteenData(canteens) {
        canteenData = canteens;
    }

    start() {
        this.app.listen(this.port);
    }

}

export default RestServer;