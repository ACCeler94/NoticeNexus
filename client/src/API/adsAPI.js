import axios from 'axios';
import { API_URL } from './config';

const adsAPI = {
  // get requests
  fetchAll: () => axios.get(`${API_URL}/ads`),
  fetchById: id => axios.get(`${API_URL}/ads/${id}`),
  fetchBySearch: searchPhrase => axios.get(`${API_URL}/ads/search/${searchPhrase}`),
  // post requests
  addNewAd: adData => axios.post(`${API_URL}/ads`, adData),
  // put requests
  updateAd: (id, newAdData) => axios.put(`${API_URL}/ads/${id}`, newAdData),
  // delete requests
  deleteById: id => axios.delete(`${API_URL}/ads/${id}`)
}

export default adsAPI;