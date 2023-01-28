import axios from 'axios'
import ip from './ip.json';
import authHeader from './auth-header';

class ForumService {
  getDetailForum(id) {
    return axios.get(`http://` + ip.ip + `:1999/api/forum/${id}`, { headers: authHeader() })
  }
  getAllForum(params) {
    return axios.get("http://" + ip.ip + ":1999/api/forum" + params, { headers: authHeader() })
  }
  getCommentOfThatForum(id){
    return axios.get(`http://` + ip.ip + `:1999/api/comment/${id}`, { headers: authHeader() })
  }
  saveCmt(uname, ccomment, cid){
    return axios.post(`http://` + ip.ip + `:1999/api/comment`, {
      uname,
      ccomment,
      cid
    }, { headers: authHeader() });
  }
  searchTitle(value){
    return axios.get(`http://` + ip.ip + `:1999/api/forum/search/${value}`, { headers: authHeader() })
  }
}
export default new ForumService();