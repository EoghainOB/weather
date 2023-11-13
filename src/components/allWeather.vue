<template v-if="currentWeatherData.time">
  <div class="allWeatherBlock">
    <div class="cityName" v-if="locationAddress.city">
      <img
        src="@/assets/icons/8324266_ui_essential_app_location_map_icon.svg"
        alt="Location"
      />
      <h2>{{ locationAddress.city }}, {{ locationAddress.country }}</h2>
    </div>
    <div>
      <CurrentWeather
        :currentWeather="this.currentWeatherData"
        :timeOfDay="this.timeOfDay"
      />
    </div>
    <div>
      <DailyWeather :dailyWeather="this.dailyWeatherData" />
    </div>
  </div>
</template>

<script>
import geocoding from "@/services/geocoding.js";
import weatherapi from "@/services/weatherapi.js";
import DailyWeather from "@/components/dailyWeather.vue";
import CurrentWeather from "@/components/currentWeather.vue";

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
    fetchWeatherData() {
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
          response.data.daily.sunset[0],
          response.data.current.time
        );
        this.address(lat, lng);
      } catch (error) {
        console.error("Failed to fetch weather data: ", error);
      }
    },
    async getTimeOfDay(sunrise, sunset, current) {
      const currentTime = new Date(current);
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

<style scoped>
.allWeatherBlock {
  padding-top: 1em;
}
.cityName {
  display: flex;
  margin-bottom: 1em;
  background-color: deepskyblue;
  border-radius: 10px;
}

.cityName h2 {
  font-family: "Merriweather", serif;
  background-color: black;
  padding: 5px 20px;
  color: white;
  border-radius: 10px;
}

img {
  width: 30px;
  padding: 8px;
}
</style>
