import BaseService from "./base"
import {LOGIN_URL,REGISTER_URL} from "../constants"
class AuthService extends BaseService {
    constructor(){
        super()
        this.LOGINURL = LOGIN_URL
        this.REGISTERURL = REGISTER_URL
    }

    async login(email, password) {
        let requestBody = { email, password };
        return await this.loadData(this.LOGINURL, requestBody, "POST");
    }

    async register(name,phone, email, password) {
        let requestBody = { name,phone, email, password };
        return await this.loadData(this.REGISTERURL, requestBody, "POST");
    }
  }

  export default new AuthService()