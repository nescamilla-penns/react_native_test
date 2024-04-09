import Database from "../Database";
import Product from "../../entities/Product";
import Brand from "../../entities/Brand";


export default class ProductDAO {

    constructor(facade) {
        this.database = facade.database;
        this.facade = facade;
    }

    async save(entity) {
        let data = {
            id: entity.getId(),
            brand_id: entity.getBrand().getId(),
            name: entity.getName(), 
            brand: entity.getBrand().getName(), 
            family: entity.getFamily(), 
            capacity: entity.getCapacity(), 
            active: entity.getActive(), 
            date: entity.getDate()
        };
        let entityFromDb = await this.getById(entity.getId());
        if (entityFromDb == null) {
            await this.database.insert(Database.PRODUCTS_TABLE, data);
        } else {
            await this.database.update(Database.PRODUCTS_TABLE, 
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
            Database.PRODUCTS_TABLE, 
            ["id", "name", "brand_id", "brand", "family", "capacity", "active", "date"],
            [
                {column: "id", comparator: "=", value: id, operator: ""}
            ],
            []
        );
        if (data.length > 0) {
            let item = data.item(0);
            entity = new Product();
            entity.setId(item.id);
            entity.setName(item.name);
            entity.setCapacity(item.capacity);
            entity.setFamily(item.family);
            let brand = new Brand();
            brand.setId(item.brand_id);
            brand.setName(item.brand);
            entity.setBrand(brand);
            entity.setActive(item.active);
            entity.setDate(item.date);
        }
        return entity;
    }

    async getByBrand(brand) {
        let entities = [];
        let data = await this.database.select(
            Database.PRODUCTS_TABLE, 
            ["id", "name", "brand_id", "brand", "family", "capacity", "active", "date"],
            [
                {column: "active", comparator: "=", value: 1, operator: "AND"},
                {column: "brand_id", comparator: "=", value: brand.getId(), operator: ""}
            ],
            [{column: "name", sort: "ASC"}]
        );
        for (var a = 0; a < data.length; a++) {
            let item = data.item(a);
            let entity = new Product();
            entity.setId(item.id);
            entity.setName(item.name);
            entity.setCapacity(item.capacity);
            entity.setFamily(item.family);
            let brand = new Brand();
            brand.setId(item.brand_id);
            brand.setName(item.brand);
            entity.setBrand(brand);
            entity.setActive(item.active);
            entity.setDate(item.date);
            entities.push(entity);
        }
        return entities;
    }

    async getAll() {
        let entities = [];
        let data = await this.database.select(
            Database.PRODUCTS_TABLE, 
            ["id", "name", "brand_id", "brand", "family", "capacity", "active", "date"],
            [
                {column: "active", comparator: "=", value: 1, operator: ""}
            ],
            [{column: "name", sort: "ASC"}]
        );
        for (var a = 0; a < data.length; a++) {
            let item = data.item(a);
            let entity = new Product();
            entity.setId(item.id);
            entity.setName(item.name);
            entity.setCapacity(item.capacity);
            entity.setFamily(item.family);
            let brand = new Brand();
            brand.setId(item.brand_id);
            brand.setName(item.brand);
            entity.setBrand(brand);
            entity.setActive(item.active);
            entity.setDate(item.date);
            entities.push(entity);
        }
        return entities;
    }
}