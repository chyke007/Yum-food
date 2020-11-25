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

    async addProduct(data) {
        let requestBody = {...data  };
        return await this.loadData(this.PRODUCT_URL, requestBody, "POST");
    }

    async editProduct(data,id) {
        let requestBody = {...data  };
        return await this.loadData(`${this.PRODUCT_URL}/${id}`, requestBody, "PUT");
    }

    async deleteProduct(id) {
        let requestBody = {  };
        return await this.loadData(`${this.PRODUCT_URL}/${id}`, requestBody, "DELETE");
    }
  }

  export default new ProductService()