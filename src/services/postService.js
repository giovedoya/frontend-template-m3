import axios from 'axios';

class PostService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/post`,
    });

    this.api.interceptors.request.use(config => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  getPosts() {
    return this.api.get('/').then(({ data }) => data).catch(err => console.error(err));
  }

  getPost(id) {
    return this.api.get(`/${id}`).then(({ data }) => data).catch(err => console.error(err))
  }

  deletePost(id) {
    return this.api.delete(`/${id}`).then(({ data }) => data).catch(err => console.error(err))
  }

  editPost(id, body) {
    return this.api.put(`/${id}`, body).then(({ data }) => data).catch(err => console.error(err))
  }

  createPost(body) {
    return this.api.post('/', body).then(({ data }) => data).catch(err => console.error(err))
  }

  uploadImage(file) {
    return this.api.post("/upload", file).then(res => res.data).catch(err => console.error(err));
  };

}

const postService = new PostService ();

export default postService;