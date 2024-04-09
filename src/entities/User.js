import Entity from "./Entity";

export default class User extends Entity {

    constructor() {
        super();
        this.name = "";
        this.email = "";
        this.password = "";
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }
    
    setEmail(email) {
        this.email = email;
    }

    getEmail() {
        return this.email;
    }

    setPassowrd(password) {
        this.password = password;
    }

    getPassword() {
        return this.password;
    }
}