import Database from "../Database";
import Dealer from "../../entities/Dealer";

export default class DealerDAO {

    constructor(facade) {
        this.database = facade.database;
        this.facade = facade;
    }

    async save(entity) {
        let data = {
            id: entity.getId(), 
            name: entity.getName(), 
            active: entity.getActive(), 
            date: entity.getDate()
        };
        let entityFromDb = await this.getById(entity.getId());
        if (entityFromDb == null) {
            await this.database.insert(Database.DEALERS_TABLE, data);
        } else {
            await this.database.update(Database.DEALERS_TABLE, 
                data, 
                [
                    {column: "id", comparator: "=", value: entity.getId(), operator: ""}, 
                ]
            );
        }
        for (let type of entity.getTypes()) {
            let data = {
                dealer_id: entity.getId(),
                type_id: type.getId()
            }
            await this.database.insert(Database.DEALERS_TYPES_TABLE, data);
        }
    }

    async getById(id) {
        let entity = null;
        let data = await this.database.select(
            Database.DEALERS_TABLE, 
            ["id", "name", "active", "date"],
            [
                {column: "id", comparator: "=", value: id, operator: ""}
            ],
            []
        );
        if (data.length > 0) {
            let item = data.item(0);
            entity = new Dealer();
            entity.setId(item.id);
            entity.setName(item.name);
            entity.setActive(item.active);
            entity.setDate(item.date);

            let dealerTypes = await this.database.getDealerTypes(id);
            for (var a = 0; a < dealerTypes.length; a++) {
                let item = dealerTypes.item(a);
                let type = await this.facade.getDealerTypeById(item.type_id);
                if (type != null) {
                    entity.addType(type);
                }
            }
        }
        return entity;
    }

    async getAll() {
        let entities = [];
        /*let data = await this.database.select(
            Database.DEALERS_TABLE, 
            ["id", "name", "active", "date"], 
            [
                {column: "active", comparator: "=", value: 1, operator: ""}
            ],
            [{column: "name", sort: "ASC"}]
        );*/
        let data = await this.database.getDealers();
        let types = await this.facade.getDealerTypes();
        var map = new Map();
        for (let type of types) {
            map.set(type.getId(), type);
        }

        for (var a = 0; a < data.length; a++) {
            let item = data.item(a);
            let entity = new Dealer();
            entity.setId(item.id);
            entity.setName(item.name);
            entity.setActive(item.active);
            entity.setDate(item.date);
            if (item.types != null) {
                let typeIds = item.types.split(",");
                for (let typeId of typeIds) {
                    let typeIdInt = parseInt(typeId);
                    if (map.has(typeIdInt)) {
                        entity.addType(map.get(typeIdInt));
                    }
                }
            }
            /*let dealerTypes = await this.database.getDealerTypes(entity.getId());
            for (var e = 0; e < dealerTypes.length; e++) {
                let item = dealerTypes.item(e);
                if (map.has(item.type_id)) {
                    entity.addType(map.get(item.type_id));
                }
            }*/
            entities.push(entity);
        }
        return entities;
    }
}