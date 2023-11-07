<template v-if="currentWeatherData.time">
  <div class="currentWeather">
    <h2>Current</h2>
    <h4 v-if="locationAddress">
      {{ locationAddress.city }}
    </h4>
    <div v-if="weatherType.day">
      <img
        :src="weatherType[timeOfDay].image"
        :alt="weatherType.day.description"
      />
      <h4>{{ weatherType[timeOfDay].description }}</h4>
    </div>
    <h4>{{ currentWeatherData.temperature_2m }}&#176;C</h4>
    <h4>{{ currentWeatherData.relativehumidity_2m }}% humidity</h4>
    <h4>{{ windDirection }}</h4>
    <h4>{{ currentWeatherData.windspeed_10m }}kmh</h4>
  </div>
  <div class="dailyWeather">
    <DailyWeather :dailyWeather="this.dailyWeatherData" />
  </div>
</template>

<script>
import geocoding from "@/services/geocoding.js";
import weatherapi from "@/services/weatherapi.js";
import weatherCodeConv from "@/assets/weaterCodeConv.json";
import DailyWeather from "@/components/dailyWeather.vue";

export default {
  name: "CurrentWeather",
  components: {
    DailyWeather,
  },
  props: {
    lat: Number,
    lng: Number,
  },
  data() {
    return {
      currentWeatherData: {},
      dailyWeatherData: {},
      windDirection: null,
      weatherType: {},
      timeOfDay: "",
      geolocationAvailable: false,
      locationName: "",
      locationAddress: [],
      locationCoordinates: [],
    };
  },
  created() {
    this.fetchWeatherData();
  },
  watch: {
    lat: "fetchWeatherData",
    lng: "fetchWeatherData",
  },
  methods: {
    async fetchWeatherData() {
      if (this.lat && this.lng) {
        this.weather(this.lat, this.lng);
      }
    },
    async weather(lat, lng) {
      try {
        const response = await weatherapi.getWeather(lat, lng);
        this.currentWeatherData = response.data.current;
        this.dailyWeatherData = response.data.daily;
        this.getTimeOfDay(
          response.data.daily.sunrise[0],
          response.data.daily.sunset[0]
        );
        this.address(lat, lng);
        this.getWeatherCode(response.data.current.weathercode);
        this.getWindDirection(response.data.current.winddirection_10m);
      } catch (error) {
        console.error("Failed to fetch weather data: ", error);
      }
    },
    async getTimeOfDay(sunrise, sunset) {
      const currentTime = new Date();
      const sunriseTime = new Date(sunrise);
      const sunsetTime = new Date(sunset);
      if (currentTime >= sunriseTime && currentTime < sunsetTime) {
        this.timeOfDay = "day";
      } else {
        this.timeOfDay = "night";
      }
    },
    async getWeatherCode(code) {
      const weather = weatherCodeConv[code];
      if (weather) {
        this.weatherType = weather;
      } else {
        this.weatherType = {};
      }
    },
    async getWindDirection(angle) {
      const directions = [
        "↓ N",
        "↙ NE",
        "← E",
        "↖ SE",
        "↑ S",
        "↗ SW",
        "→ W",
        "↘ NW",
      ];
      this.windDirection = directions[Math.round(angle / 45) % 8];
    },
    async address(lat, lng) {
      try {
        const response = await geocoding.getAddress(lat, lng);
        this.locationAddress = response.data.features[0].properties;
      } catch (error) {
        console.error("Error fetching address: ", error);
      }
    },
  },
};
</script>

<style></style>
