<template v-if="currentWeather.time">
  <h3>Current</h3>
  <div class="currentWeatherBlock">
    <div v-if="timeOfDay">
      <img :src="getWeatherImage(currentWeather.weathercode)" />
    </div>
    <div class="currentDetails">
      <h4>{{ currentWeather.temperature_2m }}&#176;C</h4>
      <h4>Precipitation: {{ currentWeather.precipitation }}mm</h4>
      <h4>{{ currentWeather.relativehumidity_2m }}% humidity</h4>
      <h4>{{ windDirection }}asdas</h4>
      <h4>{{ currentWeather.windspeed_10m }}kmh</h4>
    </div>
  </div>
</template>

<script>
import weatherCodeConv from "@/assets/weaterCodeConv.json";

export default {
  name: "CurrentWeather",

  props: {
    currentWeather: Object,
    timeOfDay: String,
  },
  data() {
    return {
      dailyWeatherData: {},
      windDirection: "",
    };
  },
  mounted() {
    this.getWindDirection(this.currentWeather.winddirection_10m);
  },
  methods: {
    getWeatherImage(code) {
      if (this.timeOfDay) {
        const weather = weatherCodeConv[code][this.timeOfDay].image;
        return weather;
      }
    },
    getWindDirection(angle) {
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
  },
};
</script>

<style scoped>
.currentWeatherBlock {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  padding-left: 15px;
  padding-right: 15px;
  max-width: 500px;
}
.currentDetails {
  display: flex;
  gap: 1em;
}
</style>
