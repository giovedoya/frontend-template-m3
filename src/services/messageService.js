import axios from 'axios';

class DressService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/message`,
    });

    this.api.interceptors.request.use(config => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  getMessages() {
    return this.api.get('/').then(({ data }) => data).catch(err => console.error(err));
  }


  createMessage(id, body) {
    return this.api.post(`/${id}`, body).then(({ data }) => data).catch(err => console.error(err))
  }

}

const dressService = new DressService();

export default dressService;