import axios from 'axios';

class SearchService {
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

  searchDresses(query) {
    return this.api.get(`/search?query=${query}`).then(({ data }) => data).catch(err => console.error(err))
  }
}

const searchService = new SearchService();

export default searchService;

