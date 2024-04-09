import Entity from "./Entity";

export default class SurveyComment extends Entity {

    constructor() {
        super();
        this.survey = null;
        this.brand = null;
        this.comment = "";
        this.sync = 0;
    }

    setSurvey(survey) {
        this.survey = survey;
    }

    getSurvey() {
        return this.survey;
    }

    setBrand(brand) {
        this.brand = brand;
    }

    getBrand() {
        return this.brand;
    }

    setComment(comment) {
        this.comment = comment;
    }

    getComment() {
        return this.comment;
    }

    setSync(sync) {
        this.sync = sync;
    }

    getSync() {
        return this.sync;
    }
}