class Dish {

    constructor(day, date, name, category, labels, prices) {
        this.day = day;
        this.date = date;
        this.name = name;
        this.category = category; 
        this.labels = labels;
        this.prices = prices;
        Object.freeze(this);
    }

}

export default Dish;