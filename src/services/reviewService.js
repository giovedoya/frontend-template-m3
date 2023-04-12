import axios from 'axios';

class ReviewService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/reviews`,
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

  createReview(id, body) {
    return this.api.post(`/${id}`, body).then(({ data }) => data).catch(err => console.error(err))
  }

  getReviewOfUserInSession(id) {
    return this.api.get(`/${id}`).then(({ data }) => data).catch(err => console.error(err));
  }

  getReviewOfDress(dressId) {
  return this.api.get(`/review/${dressId}`).then(({ data }) => data).catch(err => console.error(err));
}

  getReviewsByDressId(dressId) {
  return this.api.get(`/reviews/${dressId}`).then(({ data }) => data).catch(err => console.error(err));
}


}

const reviewService = new ReviewService ();

export default reviewService;