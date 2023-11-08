<template v-if="currentWeatherData.time">
  <div class="cityName">
    <h2 v-if="locationAddress">
      {{ locationAddress.city }}
    </h2>
  </div>
  <div>
    <CurrentWeather
      :currentWeather="currentWeatherData"
      :timeOfDay="timeOfDay"
    />
  </div>
  <div>
    <DailyWeather :dailyWeather="this.dailyWeatherData" />
  </div>
</template>

<script>
import geocoding from "@/services/geocoding.js";
import weatherapi from "@/services/weatherapi.js";
import DailyWeather from "@/components/dailyWeather.vue";
import CurrentWeather from "@/components/CurrentWeather.vue";

export default {
  name: "AllWeather",
  components: {
    DailyWeather,
    CurrentWeather,
  },
  props: {
    lat: Number,
    lng: Number,
  },
  data() {
    return {
      currentWeatherData: {},
      dailyWeatherData: {},
      timeOfDay: "",
      geolocationAvailable: false,
      locationAddress: [],
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

<style scoped></style>
