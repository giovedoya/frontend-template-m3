import axios from 'axios';

class DressService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/dress`,
    });

    this.api.interceptors.request.use(config => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  getDresses() {
    return this.api.get('/').then(({ data }) => data).catch(err => console.error(err));
  }

  getDress(id) {
    return this.api.get(`/${id}`).then(({ data }) => data).catch(err => console.error(err))
  }

  deleteDress(id) {
    return this.api.delete(`/${id}`).then(({ data }) => data).catch(err => console.error(err))
  }

  editDress(id, body) {
    return this.api.put(`/${id}/`, body).then(({ data }) => data).catch(err => console.error(err))
  }

  createDress(body) {
    return this.api.post('/', body).then(({ data }) => data).catch(err => console.error(err))
  }
   
  uploadImage(file) {
    return this.api.post("/upload", file).then(res => res.data).catch(err => console.error(err));
  };



}

const dressService = new DressService();

export default dressService;