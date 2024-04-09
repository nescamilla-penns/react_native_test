import Entity from "./Entity";

export default class SurveyProduct extends Entity {

    constructor() {
        super();
        this.survey = null;
        this.product = null;
        this.color = null;
        this.type = null;
        this.presentation = null;
        this.price = 0;
        this.photo = null,
        this.base64 = "",
        this.sync = 0;
    }

    setSurvey(survey) {
        this.survey = survey;
    }

    getSurvey() {
        return this.survey;
    }
    
    setProduct(product) {
        this.product = product;
    }

    getProduct() {
        return this.product;
    }

    setColor(color) {
        this.color = color;
    }

    getColor() {
        return this.color;
    }

    setPresentation(presentation) {
        this.presentation = presentation;
    }

    getPresentation() {
        return this.presentation;
    }

    setPhoto(photo) {
        this.photo = photo;
    }

    getPhoto() {
        return this.photo;
    }

    setBase64(base64) {
        this.base64 = base64;
    }

    getBase64() {
        return this.base64;
    }

    setType(type) {
        this.type = type;
    }

    getType() {
        return this.type;
    }

    getTypeId() {
        return this.type != null ? this.type.getId() : 0;
    }

    setPrice(price) {
        this.price = price;
    }

    getPrice() {
        return this.price;
    }

    setSync(sync) {
        this.sync = sync;
    }

    getSync() {
        return this.sync;
    }
}