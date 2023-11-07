import axios from "axios";

const baseURL = "https://api.geoapify.com/v1/geocode";

const api = axios.create({
  baseURL,
});

export default {
  async getAddress(lat, lng) {
    const apiKey = import.meta.env.VITE_GEOAPIFY;
    const res = api.get(`/reverse?lat=${lat}&lon=${lng}&apiKey=${apiKey}`);
    return res;
  },
  async getCoordinates(address) {
    const apiKey = import.meta.env.VITE_GEOAPIFY;
    const res = api.get(`/search?text=${address}&apiKey=${apiKey}`);
    return res;
  },
};
