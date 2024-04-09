import Entity from "./Entity";

export default class Dealer extends Entity {

    constructor() {
        super();
        this.name = "";
        this.types = [];
    }

    addType(type) {
        this.types.push(type);
    }

    getTypes() {
        return this.types;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    matches(dealerName, typesParam) {
        var count = 0;
        for (let type of this.types) {
            for (let id of typesParam) {
                count += id == type.getId() ? 1 : 0;
            }
        }
        var typeFlag = typesParam.length == count || typesParam.length == 0;
        var nameFlag = this.name.toLowerCase().indexOf(dealerName.toLowerCase()) >= 0;
        return typeFlag && nameFlag;
    }
}