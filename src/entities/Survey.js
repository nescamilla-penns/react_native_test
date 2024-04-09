import Entity from "./Entity";

export default class Survey extends Entity {

    constructor() {
        super();
        this.dealer = null;
        this.user = null;
        this.sync = 0;
        this.time = 0;
        this.exclusive = 0;
        this.isSyncCompleted = false;

        this.selectedTypes = [];
        this.selectedType = null;
    }

    setDealer(dealer) {
        this.dealer = dealer;
    }

    getDealer() {
        return this.dealer;
    }

    getDealerTypes() {
        return this.dealer.getTypes();
    }

    setUser(user) {
        this.user = user;
    }

    getUser() {
        return this.user;
    }

    setTime(time) {
        this.time = time;
    }

    getTime() {
        return this.time;
    }

    setSync(sync) {
        this.sync = sync;
    }

    getSync() {
        return this.sync;
    }

    setExclusive(exclusive) {
        this.exclusive = exclusive;
    }

    getExclusive(exclusive) {
        return this.exclusive;
    }

    setSelectedTypes(types) {
        this.selectedTypes = types;
    }

    getSelectedTypes() {
        return this.selectedTypes;
    }

    setSelectedType(type) {
        this.selectedType = type;
    }

    getSelectedType() {
        return this.selectedType;
    }

    setIsSyncCompleted(isSyncCompleted) {
        this.isSyncCompleted = isSyncCompleted;
    }

    getIsSyncCompleted() {
        return this.isSyncCompleted;
    }
}