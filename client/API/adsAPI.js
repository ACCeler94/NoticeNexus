import axios from 'axios';

const adsAPI = {
  // get requests
  fetchAll: () => axios.get('api/ads'),
  fetchById: id => axios.get(`api/ads/${id}`),
  fetchBySearch: searchPhrase => axios.get(`api/ads/search/${searchPhrase}`),
  // post requests
  addNewAd: adData => axios.post('api/ads', adData),
  // put requests
  updateAd: (id, newAdData) => axios.put(`api/ads/${id}`, newAdData),
  // delete requests
  deleteById: id => axios.delete(`api/ads/${id}`)
}

export default adsAPI;