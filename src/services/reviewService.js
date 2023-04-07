import axios from 'axios';

class ReviewService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/review`,
    });
    this.api.interceptors.request.use(config => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  getReviews() {
    return this.api.get('/').then(({ data }) => data).catch(err => console.error(err));
  }

  getReview(id) {
    return this.api.get(`/${id}`).then(({ data }) => data).catch(err => console.error(err))
  }

  deleteReview(id) {
    return this.api.delete(`/${id}`).then(({ data }) => data).catch(err => console.error(err))
  }

  editReview(id, body) {
    return this.api.put(`/${id}`, body).then(({ data }) => data).catch(err => console.error(err))
  }

  createReview(body) { console.log('Review data:', body);
    return this.api.post('/', body).then(({ data }) => data).catch(err => console.error(err))
  }

}

const reviewService = new ReviewService ();

export default reviewService;