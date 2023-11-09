<template>
  <h3>Weather Forecast for the Next 7 Days</h3>
  <div class="dailyWeatherBlock">
    <div class="dailyDetails">
      <div class="day" v-for="(day, index) in dailyWeather.time" :key="index">
        <h3>{{ day }}</h3>
        <img :src="getWeatherImage(dailyWeather.weathercode[index])" />
        <div class="weatherInfo">
          <div class="temperature">
            <img
              src="@/assets/icons/390473_temperature_weather_forecast_thermometer_icon.svg"
              alt="Max temperature"
            />
            <p>{{ dailyWeather.temperature_2m_max[index] }}°C</p>
          </div>
          <div class="temperature">
            <img
              src="@/assets/icons/390475_temperature_weather_forecast_thermometer_icon.svg"
              alt="Min temperature"
            />
            <p>{{ dailyWeather.temperature_2m_min[index] }}°C</p>
          </div>
          <div class="precipitation">
            <img
              src="@/assets/icons/390463_cloud_rain_weather_drop_forecast_icon.svg"
              alt="Precipitation"
            />
            <p>{{ dailyWeather.precipitation_sum[index] }}mm</p>
          </div>
          <div class="windspeed">
            <img
              src="@/assets/icons/390480_eolo_weather_wind_forecast_icon.svg"
              alt="Wind speed"
            />
            <p>{{ dailyWeather.windspeed_10m_max[index] }}km/h</p>
          </div>
        </div>
      </div>
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
  justify-content: space-between;
  flex-wrap: wrap;
}

.dailyDetails img {
  width: 100px;
}

.weatherInfo img {
  width: 30px;
}

.temperature,
.precipitation,
.windspeed {
  display: flex;
}
</style>
