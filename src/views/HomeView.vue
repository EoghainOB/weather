<template>
  <div>
    <div class="coordinates" v-if="geolocationAvailable">
      <p>Latitude: {{ location.lat }}</p>
      <p>Longitude: {{ location.lng }}</p>
    </div>
    <div v-else>
      <h2>{{ locationName }}</h2>
      <form @submit.prevent="submitLocation">
        <input type="text" placeholder="Enter location" name="locationName" />
        <button type="submit">Submit</button>
      </form>
    </div>
    <template v-if="currentWeatherData.time">
      <h2>Current</h2>
      <div>
        <img
          :src="weatherType[timeOfDay].image"
          :alt="weatherType.day.description"
        />
      </div>
      <h4>{{ weatherType[timeOfDay].description }}</h4>
      <h4>{{ currentWeatherData.temperature_2m }}&#176;C</h4>
      <h4>{{ currentWeatherData.relativehumidity_2m }}% humidity</h4>
      <h4>{{ windDirection }}</h4>
      <h4>{{ currentWeatherData.windspeed_10m }}kmh</h4>
      <h2>Daily</h2>
      <h4>{{ locationAddress.features[0].properties.city }}</h4>
    </template>
    <template v-else>
      <p>{{ loadingMessage }}</p>
    </template>
  </div>
</template>

<script>
import weatherCodeConv from "@/assets/weaterCodeConv.json";
import geocoding from "@/services/geocoding.js";
import weatherapi from "@/services/weatherapi.js";

export default {
  name: "HomeView",
  components: {
    weatherCodeConv,
  },
  data() {
    return {
      location: {
        lat: null,
        lng: null,
      },
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
  computed: {
    loadingMessage() {
      return this.geolocationAvailable ? "Loading weather data..." : "";
    },
  },
  mounted() {
    this.getLocation();
  },
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.location.lat = position.coords.latitude;
            this.location.lng = position.coords.longitude;
            this.geolocationAvailable = true;
            this.weather(this.location.lat, this.location.lng);
          },
          () => {
            this.geolocationAvailable = false;
          }
        );
      } else {
        console.error("Geolocation is not supported in this browser.");
        this.geolocationAvailable = false;
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
        this.locationAddress = response.data;
      } catch (error) {
        console.error("Error fetching address: ", error);
      }
    },
    async coordinates(address) {
      try {
        const response = await geocoding.getCoordinates(address);
        this.locationCoordinates =
          response.data.features[0].geometry.coordinates;
        this.getWeather(
          this.locationCoordinates[0],
          this.locationCoordinates[1]
        );
      } catch (error) {
        console.error("Error fetching address: ", error);
      }
    },
    submitLocation(event) {
      const name = event.target.elements.locationName.value;
      const convCoordinates = this.coordinates(name);
    },
  },
};
</script>

<style></style>
