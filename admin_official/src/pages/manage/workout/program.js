import axios from 'axios'
import ip from '../ip.json';
import authHeader from '../../User/login/auth-header';

class program {
    getMuscleProgram() {
        return axios.get("http://" + ip.ip + ":1999/api/program/muscle", { headers: authHeader() })
    }

    getVideo(params) {
        return axios.get("http://" + ip.ip + ":1999/api/list/" + params, { headers: authHeader() })
    }

    getTargetProgram() {
        return axios.get("http://" + ip.ip + ":1999/api/program/target", { headers: authHeader() })
    }

    getListWorkout(label) {
        return axios.get(`http://` + ip.ip + `:1999/api/list/${label}`, { headers: authHeader() })
    }

    getvideo(name) {
        return axios.get(`http://` + ip.ip + `:1999/api/video/${name}`, { headers: authHeader() })
    }

    getBMI(status) {
        return axios.get(`http://` + ip.ip + `:1999/api/bmi/${status}`, { headers: authHeader() })
    }

    getBMITracker(username) {
        return axios.get(`http://` + ip.ip + `:1999/api/chart/${username}`, { headers: authHeader() })
    }
    saveBMI(username, bmi) {
        return axios.post(`http://` + ip.ip + `:1999/api/bmi`, {
            username,
            bmi
        }, { headers: authHeader() })
    }

    searchVideo(value) {
        return axios.get("http://" + ip.ip + ":1999/api/list/search/" + value, { headers: authHeader() })
    }

    deleteVideo(id){
        return axios.delete(`http://` + ip.ip + `:1999/api/list/${id}`, { headers: authHeader() })
    }

    saveVideo(name, label, video) {
        return axios.post(`http://` + ip.ip + `:1999/api/program`, {
            name,
            label,
            video
        }, { headers: authHeader() })
    }

    updateVideo(id, name, label, video) {
        return axios.put(`http://` + ip.ip + `:1999/api/program`, {
            id,
            name,
            label,
            video
        }, { headers: authHeader() })
    }
}

export default new program();
