import axios from "axios";
import ip from './ip.json';

const API_URL = "http://" + ip.ip + ":1999/api/auth/";

class AuthService {

  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  changePassword(username, password, newPassword) {
    return axios.post(API_URL + "changePassword", {
      username,
      password,
      newPassword
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
