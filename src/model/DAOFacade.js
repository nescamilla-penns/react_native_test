import Database from "./Database";
import UserDAO from "./dao/UserDAO";
import BrandDAO from "./dao/BrandDAO";
import ColorDAO from "./dao/ColorDAO";
import PresentationDAO from "./dao/PresentationDAO";
import DealerDAO from "./dao/DealerDAO";
import ProductDAO from "./dao/ProductDAO";
import SurveyDAO from "./dao/SurveyDAO";
import SurveyCommentDAO from "./dao/SurveyCommentDAO";
import SurveyProductDAO from "./dao/SurveyProductDAO";
import DealerTypeDAO from "./dao/DealerTypeDAO";

export default class DAOFacade {

    static facadeInstance = null;

    static getInstance() {
        if (DAOFacade.facadeInstance == null) {
            DAOFacade.facadeInstance = new DAOFacade();
        }
        return DAOFacade.facadeInstance;
    }

    constructor() {
        this.database = Database.getInstance();
        this.userDAO = new UserDAO(this);
        this.brandDAO = new BrandDAO(this);
        this.colorDAO = new ColorDAO(this);
        this.presentationDAO = new PresentationDAO(this);
        this.dealerDAO = new DealerDAO(this);
        this.dealerTypeDAO = new DealerTypeDAO(this);
        this.productDAO = new ProductDAO(this);
        this.surveyDAO = new SurveyDAO(this);
        this.surveyCommentDAO = new SurveyCommentDAO(this);
        this.surveyProductDAO = new SurveyProductDAO(this);
    }

    async saveUser(user) {
        await this.userDAO.save(user);
    }

    async getUser(email, password) {
        return await this.userDAO.get(email, password);
    }

    async getUserById(id) {
        return await this.userDAO.getById(id);
    }

    async getUsers() {
        return await this.userDAO.getAll();
    }

    async saveDealer(dealer) {
        await this.dealerDAO.save(dealer);
    }

    async getDealerById(id) {
        return await this.dealerDAO.getById(id);
    }

    async getDealers() {
        return await this.dealerDAO.getAll();
    }

    async saveDealerType(dealerType) {
        await this.dealerTypeDAO.save(dealerType);
    }

    async getDealerTypeById(id) {
        return await this.dealerTypeDAO.getById(id);
    }

    async getDealerTypes() {
        return await this.dealerTypeDAO.getAll();
    }

    async flushDealerTypes(id) {
        return await this.database.flushDealerTypes();
    }

    async saveBrand(brand) {
        await this.brandDAO.save(brand);
    }

    async getBrandById(id) {
        return await this.brandDAO.getById(id);
    }

    async getBrands() {
        return await this.brandDAO.getAll();
    }

    async saveColor(color) {
        await this.colorDAO.save(color);
    }

    async getColorById(id) {
        return await this.colorDAO.getById(id);
    }

    async getColors() {
        return await this.colorDAO.getAll();
    }

    async savePresentation(presentation) {
        await this.presentationDAO.save(presentation);
    }

    async getPresentationById(id) {
        return await this.presentationDAO.getById(id);
    }

    async getPresentations() {
        return await this.presentationDAO.getAll();
    }

    async saveProduct(product) {
        await this.productDAO.save(product);
    }

    async getProductById(id) {
        return await this.productDAO.getById(id);
    }

    async getProducts() {
        return await this.productDAO.getAll();
    }

    async getByBrand(brand) {
        return await this.productDAO.getByBrand(brand);
    }

    async saveSurvey(survey) {
        await this.surveyDAO.save(survey);
    }

    async getSurveyById(id) {
        return await this.surveyDAO.getById(id);
    }

    async getSurveys() {
        return await this.surveyDAO.getAll();
    }

    async getSurveysByDate(date, user) {
        return await this.surveyDAO.getByDate(date, user);
    }

    async getPendingSurveys() {
        return await this.surveyDAO.getPending();
    }

    async updateSurveyAsSync(survey) {
        await this.surveyDAO.updateAsSync(survey);
    }

    async saveSurveyComment(surveyComment) {
        await this.surveyCommentDAO.save(surveyComment);
    }

    async getSurveyComment(survey, brand) {
        return await this.surveyCommentDAO.get(survey, brand);
    }

    async getPendingSurveyComments() {
        return await this.surveyCommentDAO.getPending();
    }

    async updateSurveyCommentAsSync(surveyComment) {
        await this.surveyCommentDAO.updateAsSync(surveyComment);
    }

    async saveSurveyProduct(surveyProduct) {
        await this.surveyProductDAO.save(surveyProduct);
    }

    async getSurveyProducts(survey, brand) {
        return await this.surveyProductDAO.getAll(survey, brand);
    }

    async getPendingSurveyProducts() {
        return await this.surveyProductDAO.getPending();
    }

    async updateSurveyProductAsSync(surveyProduct) {
        await this.surveyProductDAO.updateAsSync(surveyProduct);
    }

    async deactiveSurveyProduct(surveyProduct) {
        await this.surveyProductDAO.deactive(surveyProduct);
    }

    dropDatabase() {
        this.database.drop();
    }
}