import BaseService from "./base"
import {ORDER_URL} from "../constants"
class OrderService extends BaseService {
    constructor(){
        super()
        this.ORDER_URL = ORDER_URL
    }

    async getOrders(filters) {
        let requestBody = {};
        return await this.loadData(`${this.ORDER_URL}?${filters}`, requestBody, "GET");
    }
    async getOrder(id) {
        let requestBody = {};
        return await this.loadData(`${this.ORDER_URL}/${id}`, requestBody, "GET");
    }

    async addOrder() {
        let requestBody = {};
        return await this.loadData(this.ORDER_URL, requestBody, "POST");
    }

    async updateStatus(id,status) {
        let requestBody = {mode:status};
        return await this.loadData(`${this.ORDER_URL}/status/${id}`, requestBody, "PUT");
    }

    async editOrder(id) {
        let requestBody = {};
        return await this.loadData(`${this.ORDER_URL}/${id}`, requestBody, "PUT");
    }

    async deleteOrder(id) {
        let requestBody = {  };
        return await this.loadData(`${this.ORDER_URL}/${id}`, requestBody, "DELETE");
    }
  }

  export default new OrderService()