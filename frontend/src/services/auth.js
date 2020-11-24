import BaseService from "./base"
class AuthService extends BaseService {
    constructor(){
        super()
        this.LOGINURL = '/api/login'
        this.REGISTERURL = '/api/register'
    }

    async login(email, password) {
        let requestBody = { email, password };
        return await this.loadData(this.LOGINURL, requestBody, "POST");
    }

    logout() {
      localStorage.removeItem("user");
    }

    async register(name,phone, email, password) {
        let requestBody = { name,phone, email, password };
        return await this.loadData(this.REGISTERURL, requestBody, "POST");
    }
  }

  export default new AuthService()