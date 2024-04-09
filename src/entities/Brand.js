import Entity from "./Entity";

export default class Brand extends Entity {

    constructor() {
        super();
        this.name = "";
        this.order = 0;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setOrder(order) {
        this.order = order;
    }

    getOrder() {
        return this.order;
    }
}