import User from "../entities/User";
import Brand from "../entities/Brand";
import Product from "../entities/Product";
import Dealer from "../entities/Dealer";
import Color from "../entities/Color";
import DealerType from "../entities/DealerType";
import Presentation from "../entities/Presentation";

export default class Sync {

    static URL = "http://portal.pennsylvania.com.mx/intranet/";
    //static URL = "http://local/pmpp/";

    constructor() {
    }

    async fetchUser(email, password, dao) {
        try {
            let response = await fetch(Sync.URL + "competition_products/getUser", {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({email: email, password: password})
            });
            let responseJson = await response.json();
            for (let jsonUser of responseJson.users) {
                let user = new User();
                user.setId(jsonUser.id);
                user.setName(jsonUser.username);
                user.setPassowrd(jsonUser.password);
                user.setActive(jsonUser.active);
                user.setEmail(jsonUser.email);
                user.setDate(jsonUser.date);
                await dao.saveUser(user);
            }
        } catch(error) {
            console.log(error);
        }
    }

    async fetchCatalogs(dao, callback) {
        try {
            let response = await fetch(Sync.URL + "competition_products/getJson");
            let responseJson = await response.json();
            for (let jsonDealerType of responseJson.dealerTypes) {
                callback(jsonDealerType.name);
                let dealerType = new DealerType();
                dealerType.setId(jsonDealerType.id);
                dealerType.setName(jsonDealerType.name);
                dealerType.setActive(jsonDealerType.active);
                dealerType.setDate(jsonDealerType.date);
                await dao.saveDealerType(dealerType);
            }
            await dao.flushDealerTypes();
            for (let jsonDealer of responseJson.dealers) {
                callback(jsonDealer.name);
                let dealer = new Dealer();
                dealer.setId(jsonDealer.id);
                dealer.setName(jsonDealer.name);
                dealer.setActive(jsonDealer.active);
                dealer.setDate(jsonDealer.date);
                for (let typeId of jsonDealer.types) {
                    dealer.addType(await dao.getDealerTypeById(typeId));
                }
                await dao.saveDealer(dealer);
            }
            for (let jsonBrand of responseJson.brands) {
                callback(jsonBrand.name);
                let brand = new Brand();
                brand.setId(jsonBrand.id);
                brand.setName(jsonBrand.name);
                brand.setActive(jsonBrand.active);
                brand.setDate(jsonBrand.date);
                brand.setOrder(jsonBrand.order);
                await dao.saveBrand(brand);
            }
            for (let jsonColor of responseJson.colors) {
                callback(jsonColor.name);
                let color = new Color();
                color.setId(jsonColor.id);
                color.setName(jsonColor.name);
                color.setActive(jsonColor.active);
                color.setDate(jsonColor.date);
                color.setOrder(jsonColor.order);
                await dao.saveColor(color);
            }
            for (let jsonPresentation of responseJson.presentations) {
                callback(jsonPresentation.name);
                let presentation = new Presentation();
                presentation.setId(jsonPresentation.id);
                presentation.setName(jsonPresentation.name);
                presentation.setActive(jsonPresentation.active);
                presentation.setDate(jsonPresentation.date);
                presentation.setOrder(jsonPresentation.order);
                await dao.savePresentation(presentation);
            }
            for (let jsonProduct of responseJson.products) {
                callback(jsonProduct.name);
                let product = new Product();
                product.setId(jsonProduct.id);
                product.setName(jsonProduct.name);
                product.setCapacity(jsonProduct.capacity);
                product.setFamily(jsonProduct.family);
                let brand = new Brand();
                brand.setId(jsonProduct.brand_id);
                brand.setName(jsonProduct.brand);
                product.setBrand(brand);
                product.setActive(jsonProduct.active);
                product.setDate(jsonProduct.date);
                await dao.saveProduct(product);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async sendData(dao) {
        let surveys = await dao.getPendingSurveys();
        //console.log("Surveys: " + surveys.length);
        for (let survey of surveys) {
            fetch(Sync.URL + "competition_products/saveSurvey", {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify(survey)
            })
            .then(response => response.json().then(data => data))
            .then((responseData) => { 
                if (responseData.result == 1) {
                    dao.updateSurveyAsSync(survey);
                }
            })
            .catch((err) => { console.log(err); });
            // console.log(JSON.stringify(survey));
        }
        let comments = await dao.getPendingSurveyComments();
        //console.log("Comments: " + comments.length);
        for (let comment of comments) {
            fetch(Sync.URL + "competition_products/saveSurveyComment", {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify(comment)
            })
            .then(response => response.json().then(data => data))
            .then((responseData) => { 
                if (responseData.result == 1) {
                    dao.updateSurveyCommentAsSync(comment);
                }
            })
            .catch((err) => { console.log(err); });
        }

        let products = await dao.getPendingSurveyProducts();
        for (let product of products) {
            if (product.getPhoto() != '' && product.getPhoto() != null) {
              let base64 = await fetch(product.getPhoto())
                .then(response => response.blob())
                .then(blob => {
                  const reader = new FileReader();
                  reader.readAsDataURL(blob);
                  return new Promise(res => {
                    reader.onloadend = () => {
                      res(reader.result);
                    };
                  });
                });
              console.log("Ejemplo: "+ base64);
              console.log("Products: " + products.length);
              product.setBase64(base64);
            }
            fetch(Sync.URL + "competition_products/saveSurveyProduct", {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify(product)
            })
            .then(response => response.json().then(data => data))
            .then((responseData) => { 
                if (responseData.result == 1) {
                    dao.updateSurveyProductAsSync(product);
                }
            })
            .catch((err) => { console.log(err); });
        }
    }
}