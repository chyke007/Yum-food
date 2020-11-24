import axios from "axios"
class DefaultService {
    constructor(){
        this.APIKEY = ''
    }
    async loadData(url,requestBody,method){
        let error= null
        let res = await axios({
              url:url,
              method:method,
              data:requestBody,
              headers: {
                  'apikey':this.APIKEY,
                  'Authorization':`Bearer ${this.get_user_token}`,
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              }
          }).catch((err) => {
            console.log(err.response)
            // if(err.response.data.error.code === 1017){
            // //   this.set_user_token_ac(null)
            //  //this.$router.push('/login');
            //  error = {title:"Token expired",message:err.response.data.error.message}
            // }
            error = {title:"Error",message:err.response.data.error ? err.response.data.error.message :"Unknown error occured,please try again later" }
        });

          return {data:res ? res.data: null, error };
       }
  }

  export default DefaultService