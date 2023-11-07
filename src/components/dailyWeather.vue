<template>DailyWeather</template>

<script>
export default {
  name: "DailyWeather",
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
};
</script>

<style></style>
