import Database from "../Database";
import SurveyComment from "../../entities/SurveyComment";


export default class SurveyCommentDAO {

    constructor(facade) {
        this.database = facade.database;
        this.facade = facade;
    }

    async save(surveyComment) {
        let data = {
            survey_id: surveyComment.getSurvey().getId(),
            brand_id: surveyComment.getBrand().getId(), 
            comment: surveyComment.getComment(), 
            sync: surveyComment.getSync(), 
            active: surveyComment.getActive(), 
            date: surveyComment.getDate()
        };
        let entityFromDb = await this.get(surveyComment.getSurvey(), surveyComment.getBrand());
        if (entityFromDb == null) {
            await this.database.insert(Database.SURVEY_COMMENTS_TABLE, data);
            let newId = await this.getLastInsertedId();
            surveyComment.setId(newId);
        } else {
            surveyComment.setId(entityFromDb.getId());
            await this.database.update(Database.SURVEY_COMMENTS_TABLE, 
                data, 
                [
                    {column: "id", comparator: "=", value: surveyComment.getId(), operator: ""}, 
                ]
            );
        }
        return surveyComment;
    }



    async get(survey, brand) {
        let dbSurveyComment = null;
        let data = await this.database.select(
            Database.SURVEY_COMMENTS_TABLE, 
            ["id", "survey_id", "brand_id", "comment", "sync", "active", "date"],
            [
                {column: "survey_id", comparator: "=", value: survey.getId(), operator: "AND"},
                {column: "brand_id", comparator: "=", value: brand.getId(), operator: ""}
            ],
            []
        );
        if (data.length > 0) {
            let item = data.item(0);
            dbSurveyComment = new SurveyComment();
            dbSurveyComment.setId(item.id);
            let survey = await this.facade.getSurveyById(item.survey_id);
            let brand = await this.facade.getBrandById(item.brand_id);
            dbSurveyComment.setSurvey(survey);
            dbSurveyComment.setBrand(brand);
            dbSurveyComment.setSync(item.sync);
            dbSurveyComment.setComment(item.comment);
            dbSurveyComment.setActive(item.active);
            dbSurveyComment.setDate(item.date);
        }
        return dbSurveyComment;
    }

    async getPending() {
        let entities = [];
        let data = await this.database.select(
            Database.SURVEY_COMMENTS_TABLE, 
            ["id", "survey_id", "brand_id", "comment", "sync", "active", "date"],
            [
                {column: "sync", comparator: "=", value: 0, operator: ""},
            ],
            []
        );
        for (var a = 0; a < data.length; a++) {
            let item = data.item(a);
            let dbSurveyComment = new SurveyComment();
            dbSurveyComment.setId(item.id);
            let survey = await this.facade.getSurveyById(item.survey_id);
            let brand = await this.facade.getBrandById(item.brand_id);
            dbSurveyComment.setSurvey(survey);
            dbSurveyComment.setBrand(brand);
            dbSurveyComment.setSync(item.sync);
            dbSurveyComment.setComment(item.comment);
            dbSurveyComment.setActive(item.active);
            dbSurveyComment.setDate(item.date);
            entities.push(dbSurveyComment);
        }
        return entities;
    }

    async updateAsSync(surveyComment) {
        if (surveyComment.getId() > 0) {
            surveyComment.setSync(1);
            let data = {sync: surveyComment.getSync(),};
            await this.database.update(Database.SURVEY_COMMENTS_TABLE, 
                data, 
                [
                    {column: "id", comparator: "=", value: surveyComment.getId(), operator: ""}, 
                ]
            );
        }
        return surveyComment;
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