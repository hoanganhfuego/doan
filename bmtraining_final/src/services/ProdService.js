// import authHeader from './auth-header';
import axios from 'axios'
import ip from './ip.json';
import authHeader from './auth-header';

const APPAREL_REST_API_URL = "http://" + ip.ip + ":1999/api/products/category/apparel"
const SUPPLEMENT_REST_API_URL = "http://" + ip.ip + ":1999/api/products/category/supplement"
const accessories_REST_API_URL = "http://" + ip.ip + ":1999/api/products/category/accessories"
const randomAPPAREL_REST_API_URL = "http://" + ip.ip + ":1999/api/products/Rcategory/apparel"
const randomSUPPLEMENT_REST_API_URL = "http://" + ip.ip + ":1999/api/products/Rcategory/supplement"
const randomaccessories_REST_API_URL = "http://" + ip.ip + ":1999/api/products/Rcategory/accessories"
class ProdService {

  getSuppProds() {
    return axios.get(SUPPLEMENT_REST_API_URL, { headers: authHeader() })
  }
  getApparelProds() {
    return axios.get(APPAREL_REST_API_URL, { headers: authHeader() });
  }
  getAccessoriesProds() {
    return axios.get(accessories_REST_API_URL, { headers: authHeader() });
  }
  getRSuppProds() {
    return axios.get(randomSUPPLEMENT_REST_API_URL, { headers: authHeader() })
  }
  getRApparelProds() {
    return axios.get(randomAPPAREL_REST_API_URL, { headers: authHeader() });
  }
  getRAccessoriesProds() {
    return axios.get(randomaccessories_REST_API_URL, { headers: authHeader() });
  }
  getDetailPro(id) {
    return axios.get(`http://` + ip.ip + `:1999/api/products/${id}`, { headers: authHeader() })
  }
  getAllProds() {
    return axios.get("http://" + ip.ip + ":1999/api/products", { headers: authHeader() })
  }
  pay(price, description, username, image) {
    return axios.post(`http://` + ip.ip + `:1999/pay`, {
      price,
      description,
      username, 
      image
    } , { headers: authHeader() })
  }
  redirect() {
    return axios.get(`http://` + ip.ip + `:1999/link`, { headers: authHeader() })
  }
  search(value) {
    return axios.get(`http://` + ip.ip + `:1999/api/products/search/${value}`, { headers: authHeader() })
  }
  getSuccess(username) {
    return axios.get(`http://` + ip.ip + `:1999/api/order/${username}/success`, { headers: authHeader() })
  }
  getCancel(username) {
    return axios.get(`http://` + ip.ip + `:1999/api/order/${username}/cancel`, { headers: authHeader() })
  }
}
export default new ProdService();