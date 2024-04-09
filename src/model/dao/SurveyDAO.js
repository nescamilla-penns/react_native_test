import Database from "../Database";
import Survey from "../../entities/Survey";


export default class SurveyDAO {

    constructor(facade) {
        this.database = facade.database;
        this.facade = facade;
    }

    async save(survey) {
        let data = {
            dealer_id: survey.getDealer().getId(),
            user_id: survey.getUser().getId(), 
            time: survey.getTime(), 
            sync: survey.getSync(), 
            exclusive: survey.getExclusive(),
            active: survey.getActive(), 
            date: survey.getDate()
        };
        let entityFromDb = await this.getById(survey.getId());
        if (entityFromDb == null) {
            await this.database.insert(Database.SURVEYS_TABLE, data);
            let newId = await this.getLastInsertedId();
            survey.setId(newId);
        } else {
            await this.database.update(Database.SURVEYS_TABLE, 
                data, 
                [
                    {column: "id", comparator: "=", value: survey.getId(), operator: ""}, 
                ]
            );
        }
        return survey;
    }

    async getById(id) {
        let survey = null;
        let data = await this.database.select(
            Database.SURVEYS_TABLE, 
            ["id", "dealer_id", "user_id", "time", "sync", "active", "date", "exclusive"],
            [
                {column: "id", comparator: "=", value: id, operator: ""}
            ],
            []
        );
        if (data.length > 0) {
            let item = data.item(0);
            survey = new Survey();
            survey.setId(item.id);
            let user = await this.facade.getUserById(item.user_id);
            let dealer = await this.facade.getDealerById(item.dealer_id);
            survey.setUser(user);
            survey.setDealer(dealer);
            survey.setSync(item.sync);
            survey.setTime(item.time);
            survey.setActive(item.active);
            survey.setExclusive(item.exclusive);
            survey.setDate(item.date);
        }
        return survey;
    }

    async getByDate(date, user) {
        let surveys = [];
        let data = await this.database.select(
            Database.SURVEYS_TABLE, 
            ["id", "dealer_id", "user_id", "time", "sync", "active", "date", "exclusive"],
            [
                {column: "date", comparator: "=", value: date, operator: "AND"},
                {column: "user_id", comparator: "=", value: user.getId(), operator: ""},
            ],
            [{column: "id", sort: "DESC"}]
        );
        for (var a = 0; a < data.length; a++) {
            let item = data.item(a);
            let survey = new Survey();
            survey.setId(item.id);
            let user = await this.facade.getUserById(item.user_id);
            let dealer = await this.facade.getDealerById(item.dealer_id);
            survey.setUser(user);
            survey.setDealer(dealer);
            survey.setSync(item.sync);
            survey.setTime(item.time);
            survey.setActive(item.active);
            survey.setExclusive(item.exclusive);
            survey.setDate(item.date);
            survey.setIsSyncCompleted(true);
            let nUnsyncProductsItem = await this.database.getNumberOfUnsyncProducts(survey.getId());
            let item2 = nUnsyncProductsItem.item(0);
            let nUnsyncProducts = item2.total;
            let nUnsyncCommentsItem = await this.database.getNumberOfUnsyncComments(survey.getId())
            let item3 = nUnsyncCommentsItem.item(0);
            let nUnsyncComments = item3.total;
            if (survey.getSync() == 0 || nUnsyncComments > 0 || nUnsyncProducts > 0) {
                survey.setIsSyncCompleted(false);
            }
            surveys.push(survey);
        }
        return surveys;
    }

    async getAll() {
        let surveys = [];
        let data = await this.database.select(
            Database.SURVEYS_TABLE, 
            ["id", "dealer_id", "user_id", "time", "sync", "active", "date", "exclusive"],
            [],
            [{column: "id", sort: "DESC"}]
        );
        for (var a = 0; a < data.length; a++) {
            let item = data.item(a);
            let survey = new Survey();
            survey.setId(item.id);
            let user = await this.facade.getUserById(item.user_id);
            let dealer = await this.facade.getDealerById(item.dealer_id);
            survey.setUser(user);
            survey.setDealer(dealer);
            survey.setSync(item.sync);
            survey.setTime(item.time);
            survey.setActive(item.active);
            survey.setExclusive(item.exclusive);
            survey.setDate(item.date);
            surveys.push(survey);
        }
        return surveys;
    }

    async getPending() {
        let surveys = [];
        let data = await this.database.select(
            Database.SURVEYS_TABLE, 
            ["id", "dealer_id", "user_id", "time", "sync", "active", "date", "exclusive"],
            [
                {column: "sync", comparator: "=", value: 0, operator: ""}
            ],
            []
        );
        for (var a = 0; a < data.length; a++) {
            let item = data.item(a);
            let survey = new Survey();
            survey.setId(item.id);
            let user = await this.facade.getUserById(item.user_id);
            let dealer = await this.facade.getDealerById(item.dealer_id);
            survey.setUser(user);
            survey.setDealer(dealer);
            survey.setSync(item.sync);
            survey.setTime(item.time);
            survey.setActive(item.active);
            survey.setExclusive(item.exclusive);
            survey.setDate(item.date);
            surveys.push(survey);
        }
        return surveys;
    }

    async updateAsSync(survey) {
        if (survey.getId() > 0) {
            survey.setSync(1);
            let data = {sync: survey.getSync(),};
            await this.database.update(Database.SURVEYS_TABLE, 
                data, 
                [
                    {column: "id", comparator: "=", value: survey.getId(), operator: ""}, 
                ]
            );
        }
        return survey;
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