import axios from 'axios';

const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:5001/open-kitchen-b1d3a/us-central1/api'
    : 'https://api-us4ylpmakq-uc.a.run.app';

class API {
  setHeaders = (token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  getFullUrl(url) {
    return `${BASE_URL}${url}`;
  }
  
  get = async (url, options) => {
    const response = await axios.get(this.getFullUrl(url), options);
    return response;
  }

  post = async (url, data, options) => {
    const response = await axios.post(this.getFullUrl(url), data, options);
    return response;
  }

  put = async (url, data, options) => {
    const response = await axios.put(this.getFullUrl(url), data, options);
    return response;
  }

  delete = async (url, options) => {
    const response = await axios.delete(this.getFullUrl(url), options);
    return response;
  }
}

const api = new API();

export default api;
