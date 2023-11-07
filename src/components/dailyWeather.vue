<template>
  <h2>Weather Forecast for the Next 7 Days</h2>
  <div class="dailyDetails">
    <div class="day" v-for="(day, index) in dailyWeather.time" :key="index">
      <h3>{{ day }}</h3>
      <img :src="getWeatherImage(dailyWeather.weathercode[index])" />
      <p>Max: {{ dailyWeather.temperature_2m_max[index] }}°C</p>
      <p>Min: {{ dailyWeather.temperature_2m_min[index] }}°C</p>
      <p>Precipitation: {{ dailyWeather.precipitation_sum[index] }} mm</p>
      <p>Max Wind Speed: {{ dailyWeather.windspeed_10m_max[index] }} km/h</p>
    </div>
  </div>
</template>

<script>
import weatherCodeConv from "@/assets/weaterCodeConv.json";

export default {
  name: "DailyWeather",
  props: {
    dailyWeather: Object,
  },
  methods: {
    getWeatherImage(code) {
      const weather = weatherCodeConv[code].day.image;
      return weather;
    },
  },
};
</script>

<style scoped>
.dailyDetails {
  display: flex;
}
.dailyDetails img {
  width: 100px;
}
</style>
