<template v-if="currentWeather.time">
  <div
    :class="[
      'currentWeatherBlock',
      timeOfDay === 'day' ? 'dayTime' : 'nightTime',
    ]"
  >
    <div v-if="timeOfDay">
      <img :src="getWeatherImage(currentWeather.weathercode)" />
    </div>
    <div class="currentDetails">
      <div class="temperature">
        <img
          src="@/assets/icons/390474_temperature_weather_forecast_thermometer_icon.svg"
          alt="Temperature"
        />
        <h4>{{ currentWeather.temperature_2m }}&#176;C</h4>
      </div>
      <div class="precipitation">
        <img
          src="@/assets/icons/390463_cloud_rain_weather_drop_forecast_icon_white.svg"
          alt="Precipitation"
        />
        <h4>{{ currentWeather.precipitation }}mm</h4>
      </div>
      <div class="humidity">
        <img
          src="@/assets/icons/390469_arrow_cloud_upload_weather_up_icon.svg"
          alt="Humidity"
        />
        <h4>{{ currentWeather.relativehumidity_2m }}%</h4>
      </div>
      <div class="windSpeed">
        <img
          src="@/assets/icons/390480_eolo_weather_wind_forecast_icon_white.svg"
          alt="Wind speed"
        />
        <h4>{{ currentWeather.windspeed_10m }}kmh ({{ windDirection }})</h4>
      </div>
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
      windDirection: "",
    };
  },
  methods: {
    getWeatherImage(code) {
      const weather = weatherCodeConv[code][this.timeOfDay].image;
      this.getWindDirection(this.currentWeather.winddirection_10m);
      return weather;
    },
    getWindDirection(angle) {
      if (this.currentWeather.winddirection_10m) {
        const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
        this.windDirection = directions[Math.round(angle / 45) % 8];
      }
    },
  },
};
</script>

<style scoped>
.currentWeatherBlock {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
}

.dayTime {
  background-color: deepskyblue;
}
.nightTime {
  background-color: rgb(11, 0, 54);
}
.currentDetails {
  width: 100%;
  background-color: rgb(0, 0, 0);
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  gap: 1em;
}

.currentDetails img {
  height: 40px;
}

.temperature,
.precipitation,
.humidity,
.windDirection,
.windSpeed {
  display: flex;
  align-items: center;
}

.windSpeed {
  margin-right: 15px;
}

@media only screen and (max-width: 500px) {
  .currentDetails {
    gap: 0;
  }
  .temperature,
  .precipitation,
  .humidity,
  .windDirection,
  .windSpeed {
    display: flex;
    width: 45%;
    height: 40px;
  }
  .windSpeed {
    margin-right: 0;
  }

  .temperature,
  .humidity {
    padding-left: 20px;
  }
  h4 {
    padding: 0;
    margin: 0;
  }
}
</style>
