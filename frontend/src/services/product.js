import BaseService from "./base"
import {PRODUCT_URL,PRODUCT_REVIEW_URL} from "../constants"
class ProductService extends BaseService {
    constructor(){
        super()
        this.PRODUCT_URL = PRODUCT_URL
        this.REVIEWURL = PRODUCT_REVIEW_URL
    }

    async getProducts(filters) {
        let requestBody = {};
        return await this.loadData(`${this.PRODUCT_URL}?${filters}`, requestBody, "GET");
    }
    async getProduct(id) {
        let requestBody = {};
        return await this.loadData(`${this.PRODUCT_URL}/${id}`, requestBody, "GET");
    }

    async addProduct(name,price,description,image) {
        let formData = new FormData();

        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);
        image && formData.append("image", image) ;

        return await this.loadData(this.PRODUCT_URL, formData, "POST");
    }

    async editProduct(name,price,description,id,image) {
        let formData = new FormData();

        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);
        image && formData.append("image", image) ;
        return await this.loadData(`${this.PRODUCT_URL}/${id}`, formData, "PUT");
    }

    async deleteProduct(id) {
        let requestBody = {  };
        return await this.loadData(`${this.PRODUCT_URL}/${id}`, requestBody, "DELETE");
    }
  }

  export default new ProductService()