import Database from "../Database";
import SurveyProduct from "../../entities/SurveyProduct";

export default class SurveyProductDAO {

    constructor(facade) {
        this.database = facade.database;
        this.facade = facade;
    }

    async save(surveyProduct) {
        let data = {
            survey_id: surveyProduct.getSurvey().getId(),
            product_id: surveyProduct.getProduct().getId(),
            color_id: surveyProduct.getColor().getId(), 
            presentation_id: surveyProduct.getPresentation().getId(),
            price: surveyProduct.getPrice(), 
            photo: surveyProduct.getPhoto(),
            sync: surveyProduct.getSync(), 
            active: surveyProduct.getActive(), 
            date: surveyProduct.getDate(),
            type_id: surveyProduct.getTypeId()
        };
        
        let entityFromDb = await this.getById(surveyProduct.getId());
        if (entityFromDb == null) {
            await this.database.insert(Database.SURVEY_PRODUCTS_TABLE, data);
            let newId = await this.getLastInsertedId();
            surveyProduct.setId(newId);
        } else {
            await this.database.update(Database.SURVEY_PRODUCTS_TABLE, 
                data, 
                [
                    {column: "id", comparator: "=", value: surveyProduct.getId(), operator: ""}, 
                ]
            );
        }
        return surveyProduct;
    }

    async getById(id) {
        let surveyProduct = null;
        let data = await this.database.select(
            Database.SURVEY_PRODUCTS_TABLE, 
            ["id", "survey_id", "product_id", "color_id", "presentation_id", "price", "photo", "sync", "active", "date", "type_id"],
            [
                {column: "id", comparator: "=", value: id, operator: ""},
            ],
            []
        );
        if (data.length > 0) {
            let item = data.item(0);
            surveyProduct = new SurveyProduct();
            surveyProduct.setId(item.id);
            let survey = await this.facade.getSurveyById(item.survey_id);
            let product = await this.facade.getProductById(item.product_id);
            let color = await this.facade.getColorById(item.color_id);
            let type = await this.facade.getDealerTypeById(item.type_id);
            let presentation = await this.facade.getPresentationById(item.presentation_id);
            surveyProduct.setSurvey(survey);
            surveyProduct.setProduct(product);
            surveyProduct.setColor(color);
            surveyProduct.setPresentation(presentation);
            surveyProduct.setPhoto(item.photo);
            surveyProduct.setSync(item.sync);
            surveyProduct.setPrice(item.price);
            surveyProduct.setActive(item.active);
            surveyProduct.setDate(item.date);
            surveyProduct.setType(type);
        }
        return surveyProduct;
    }

    async getAll(survey, brand) {
        let entities = [];
        let data = await this.database.getSurveyProducts(survey.getId(), brand.getId());
        for (var a = 0; a < data.length; a++) {
            let item = data.item(a);
            let surveyProduct = new SurveyProduct();
            surveyProduct.setId(item.id);
            let survey = await this.facade.getSurveyById(item.survey_id);
            let product = await this.facade.getProductById(item.product_id);
            let color = await this.facade.getColorById(item.color_id);
            let type = await this.facade.getDealerTypeById(item.type_id);
            let presentation = await this.facade.getPresentationById(item.presentation_id);
            surveyProduct.setSurvey(survey);
            surveyProduct.setProduct(product);
            surveyProduct.setColor(color);
            surveyProduct.setPresentation(presentation);
            surveyProduct.setPhoto(item.photo);
            surveyProduct.setSync(item.sync);
            surveyProduct.setPrice(item.price);
            surveyProduct.setActive(item.active);
            surveyProduct.setDate(item.date);
            surveyProduct.setType(type);
            entities.push(surveyProduct);
        }
        console.log(entities);
        return entities;
    }

    async getPending() {
        let entities = [];
        let data = await this.database.getUnsyncSurveyProducts();
        for (var a = 0; a < data.length; a++) {
            let item = data.item(a);
            let surveyProduct = new SurveyProduct();
            surveyProduct.setId(item.id);
            let survey = await this.facade.getSurveyById(item.survey_id);
            let product = await this.facade.getProductById(item.product_id);
            let color = await this.facade.getColorById(item.color_id);
            let type = await this.facade.getDealerTypeById(item.type_id);
            let presentation = await this.facade.getPresentationById(item.presentation_id);
            surveyProduct.setSurvey(survey);
            surveyProduct.setProduct(product);
            surveyProduct.setColor(color);
            surveyProduct.setPresentation(presentation);
            surveyProduct.setPhoto(item.photo);
            surveyProduct.setSync(item.sync);
            surveyProduct.setPrice(item.price);
            surveyProduct.setActive(item.active);
            surveyProduct.setDate(item.date);
            surveyProduct.setType(type);
            entities.push(surveyProduct);
        }
        return entities;
    }

    async updateAsSync(surveyProduct) {
        if (surveyProduct.getId() > 0) {
            surveyProduct.setSync(1);
            let data = {sync: surveyProduct.getSync(),};
            await this.database.update(Database.SURVEY_PRODUCTS_TABLE, 
                data, 
                [
                    {column: "id", comparator: "=", value: surveyProduct.getId(), operator: ""}, 
                ]
            );
        }
        return surveyProduct;
    }

    async deactive(surveyProduct) {
        surveyProduct.setActive(0);
        surveyProduct.setSync(0);
        let data = {
            sync: surveyProduct.getSync(), 
            active: surveyProduct.getActive(),
        };
        await this.database.update(Database.SURVEY_PRODUCTS_TABLE, 
            data, 
            [
                {column: "id", comparator: "=", value: surveyProduct.getId(), operator: ""}, 
            ]
        );
        return surveyProduct;
    }

    async getLastInsertedId() {
        let data = await this.database.getLastInsertedId();
        if (data.length > 0) {
            let item = data.item(0);
            return item.id;
        }
        return 0;
    }
}