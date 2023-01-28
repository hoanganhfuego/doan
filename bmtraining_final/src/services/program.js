import axios from 'axios'
import ip from './ip.json';
import authHeader from './auth-header';

class program {
    getMuscleProgram() {
        return axios.get("http://" + ip.ip + ":1999/api/program/muscle", { headers: authHeader() })
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
}

export default new program();
