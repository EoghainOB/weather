<template>
  <div class="dailyWeatherBlock">
    <div class="dailyDetails">
      <div class="day" v-for="(day, index) in dailyWeather.time" :key="index">
        <div class="dayDetails">
          <div class="dailyWeatherImage">
            <img :src="getWeatherImage(dailyWeather.weathercode[index])" />
          </div>
          <div class="allDetails">
            <div class="weatherDate">
              <h3>{{ day.split("-").reverse().join("-") }}</h3>
            </div>
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
.dailyWeatherBlock {
  margin-top: 1em;
}
.day {
  background-color: rgb(255, 255, 255);
  border: solid 1px rgb(224, 224, 224);
  border-radius: 10px;
  padding: 5px;
  margin-bottom: 1em;
}
.dailyDetails {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
}

.dailyDetails img {
  width: 100px;
}

.allDetails {
  padding-top: 10px;
}

.weatherInfo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1em;
}
.weatherInfo img {
  width: 30px;
}

.temperature,
.precipitation,
.windspeed {
  display: flex;
}

.dayDetails {
  display: flex;
  align-items: center;
}
.day h3 {
  font-size: 1em;
  padding: 0px 8px;
  margin: 0;
}

.day p {
  font-size: 0.8em;
}
</style>
