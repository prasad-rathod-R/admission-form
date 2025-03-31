import axios from 'axios';

const API_BASE_URL = "http://localhost:8081/api/auth/public";

class AuthService {
    register(user) {
        return axios.post(`${API_BASE_URL}/signup`, user);
    }

    login(credentials) {
        return axios.post(`${API_BASE_URL}/signin`, credentials);
    }
}

export default new AuthService();