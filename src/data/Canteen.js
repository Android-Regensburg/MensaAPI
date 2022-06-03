class Canteen {

    constructor(location, school, name, updateMenuRequest) {
        this.location = location;
        this.school = school;
        this.name = name;
        this.updateMenuRequest = updateMenuRequest;
        this.menu = [];
    }

    async update() {
        this.menu = await this.updateMenuRequest.run();
        return this;
    }

    setMenu(menu) {
        this.menu = menu;
    }

    getMenu() {
        return this.menu;
    }
}

export default Canteen;