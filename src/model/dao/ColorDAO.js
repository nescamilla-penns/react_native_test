import Database from "../Database";
import Color from "../../entities/Color";


export default class ColorDAO {

    constructor(facade) {
        this.database = facade.database;
        this.facade = facade;
    }

    async save(entity) {
        let data = {
            id: entity.getId(), 
            name: entity.getName(), 
            active: entity.getActive(), 
            date: entity.getDate(),
            sort: entity.getOrder(),
        };
        let entityFromDb = await this.getById(entity.getId());
        if (entityFromDb == null) {
            await this.database.insert(Database.COLORS_TABLE, data);
        } else {
            await this.database.update(Database.COLORS_TABLE, 
                data, 
                [
                    {column: "id", comparator: "=", value: entity.getId(), operator: ""}, 
                ]
            );
        }
    }

    async getById(id) {
        let entity = null;
        let data = await this.database.select(
            Database.COLORS_TABLE, 
            ["id", "name", "active", "date", "sort"],
            [
                {column: "id", comparator: "=", value: id, operator: ""}
            ],
            []
        );
        if (data.length > 0) {
            let item = data.item(0);
            entity = new Color();
            entity.setId(item.id);
            entity.setName(item.name);
            entity.setActive(item.active);
            entity.setDate(item.date);
            entity.setOrder(item.sort);
        }
        return entity;
    }

    async getAll() {
        let entities = [];
        let data = await this.database.select(
            Database.COLORS_TABLE, 
            ["id", "name", "active", "date", "sort"], 
            [],
            [{column: "sort", sort: "ASC"}],
            [{column: "name", sort: "DESC"}],
        );
        for (var a = 0; a < data.length; a++) {
            let item = data.item(a);
            let entity = new Color();
            entity.setId(item.id);
            entity.setName(item.name);
            entity.setActive(item.active);
            entity.setDate(item.date);
            entity.setOrder(item.sort);
            entities.push(entity);
        }
        return entities;
    }
}