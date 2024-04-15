import User from "../../entities/User";
import Database from "../Database";


export default class UserDAO {

    constructor(facade) {
        this.database = facade.database;
        this.facade = facade;
    }

    async save(user) {
        let data = {
            id: user.getId(), 
            email: user.getEmail(), 
            name: user.getName(), 
            password: user.getPassword(), 
            active: user.getActive(), 
            date: user.getDate()
        };
        let userFromDb = await this.getById(user.getId());
        if (userFromDb == null) {
            await this.database.insert(Database.USERS_TABLE, data);
        } else {
            await this.database.update(Database.USERS_TABLE, 
                data, 
                [
                    {"column": "id", "comparator": "=", "value": user.getId(), "operator": ""}, 
                ]
            );
        }
    }
    

    async get(email, password) {
        var sha1 = require('sha1');
        let user = null;
        // let data = await this.database.select(
        //     Database.USERS_TABLE, 
        //     ["id", "name", "password", "email", "active", "date"],
        //     [
        //         {"column": "email", "comparator": "=", "value": email, "operator": "AND"}, 
        //         {"column": "(password", "comparator": "=", "value": password, "operator": "OR"},
        //         {"column": "password", "comparator": "=", "value": sha1(password), "operator": ")"},
        //     ],
        //     []
        // );
        let data = await this.database.select(
            Database.USERS_TABLE, 
            ["id", "name", "password", "email", "active", "date"],
            [
                {"column": "email", "comparator": "=", "value": email, "operator": ""}, 
            ],
            []
        );
        if (data.length > 0) {
            let item = data.item(0);
            user = new User();
            user.setId(item.id);
            user.setName(item.name);
            user.setPassword(item.password);
            user.setActive(item.active);
            user.setEmail(item.email);
            user.setDate(item.date);
        }
        return user;
    }

    async getById(id) {
        let user = null;
        let data = await this.database.select(
            Database.USERS_TABLE, 
            ["id", "name", "password", "email", "active", "date"],
            [
                {"column": "id", "comparator": "=", "value": id, "operator": ""}
            ],
            []
        );
        if (data.length > 0) {
            let item = data.item(0);
            user = new User();
            user.setId(item.id);
            user.setName(item.name);
            user.setPassword(item.password);
            user.setActive(item.active);
            user.setEmail(item.email);
            user.setDate(item.date);
        }
        return user;
    }

    async getAll() {
        let users = [];
        let data = await this.database.select(
            Database.USERS_TABLE, 
            ["id", "name", "password", "email", "active", "date"], 
            [],
            []
        );
        for (var a = 0; a < data.length; a++) {
            let item = data.item(a);
            let user = new User();
            user.setId(item.id);
            user.setName(item.name);
            user.setPassword(item.password);
            user.setActive(item.active);
            user.setEmail(item.email);
            user.setDate(item.date);
            users.push(user);
        }
        return users;
    }
}