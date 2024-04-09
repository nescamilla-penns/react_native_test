import Entity from "./Entity";

export default class Product extends Entity {

    constructor() {
        super();
        this.name = "";
        this.family = "";
        this.capacity = "";
        this.brand = null;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setFamily(family) {
        this.family = family;
    }

    getFamily() {
        return this.family;
    }

    setCapacity(capacity) {
        this.capacity = capacity;
    }

    getCapacity() {
        return this.capacity;
    }

    setBrand(brand) {
        this.brand = brand;
    }

    getBrand() {
        return this.brand;
    }
}