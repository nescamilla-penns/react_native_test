export default class Entity {

    constructor() {
        this.date = "";
        this.id = 0;
        this.active = 0;
    }

    setId(id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    setDate(date) {
        this.date = date;
    }

    getDate() {
        return this.date;
    }

    setActive(active) {
        this.active = active;
    }

    getActive() {
        return this.active;
    }

    isActive() {
        return this.active == 1;
    }

    /**
     * 
     * @param {String} date
     * Returns:
     *     1 if entity.date is greater than entityParam.date
     *    -1 if entity.date is less than entityParam.date
     *     0 if entity.date is equal than entityParam.date
     */
    compareEntityDate(entityParam) {
        let v1 = Date.parse(this.date);
        let v2 = Date.parse(entityParam.date);
        return v1 > v2 ? 1 : v1 < v2 ? -1 : 0;
    }
}