import axios from "axios";

const baseURL = "https://api.open-meteo.com/v1/forecast";

const api = axios.create({
  baseURL,
});

export default {
  async getWeather(lat, lng) {
    return api.get(
      `?latitude=${lat}&longitude=${lng}&current=temperature_2m,relativehumidity_2m,apparent_temperature,is_day,precipitation,weathercode,windspeed_10m,winddirection_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,showers_sum,precipitation_hours,windspeed_10m_max&timezone=auto`
    );
  },
};
