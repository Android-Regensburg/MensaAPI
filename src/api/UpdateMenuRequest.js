import Dish from '../data/Dish.js';

function getCurrentWeekNumber() {
    let now = new Date(),
        firstWeekOfYear = new Date(now.getFullYear(), 0, 4);
    now.setHours(0, 0, 0, 0);
    now.setDate(now.getDate() + 3 - (now.getDay() + 6) % 7);
    return 1 + Math.round(((now.getTime() - firstWeekOfYear.getTime()) / 86400000 - 3 + (firstWeekOfYear.getDay() + 6) % 7) / 7);
}

function getDayFromShortcut(shortcut) {
    switch (shortcut) {
        case 'Mo':
            return 'Monday';
        case 'Di':
            return 'Tuesday';
        case 'Mi':
            return 'Wednesday';
        case 'Do':
            return 'Thursday';
        case 'Fr':
            return 'Friday';
        default:
            return null;
    }
}

function createDishesFromLines(lines) {
    let validLines = lines.filter((line) => {
        let columns = line.split(process.env.CSV_DELIMITER);
        if (columns.length === process.env.CSV_COLUMN_COUNT) {
            return true;
        }
        return false;
    });
    return validLines.map((line) => {
        let columns = line.split(process.env.CSV_DELIMITER),
            date = columns[0],
            day = getDayFromShortcut(columns[1]),
            category = columns[2],
            name = columns[3].substring(0, columns[3].indexOf('(')),
            labels = columns[4],
            price = {
                forStudents: columns[6],
                forEmployees: columns[7],
                forGuests: columns[8]
            };
        return new Dish(day, date, name, category, labels, price);
    });
}


class UpdateMenuRequest {

    constructor(url) {
        this.url = url;
    }

    async run() {
        let response = await fetch(`${this.url}\\${getCurrentWeekNumber()}.csv`),
            csv = await response.text(),
            lines = csv.split("\n"),
            contentLines = lines.splice(1, lines.length);
        return createDishesFromLines(contentLines);
    }
}

export default UpdateMenuRequest;