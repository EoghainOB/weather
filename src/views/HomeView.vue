<template>
  <div v-if="this.location.lat">
    <div>
      <CurrentWeather :lat="this.location.lat" :lng="this.location.lng" />
    </div>
    <DailyWeather />
  </div>
  <div v-else>
    <LocationInput @coordinatesUpdated="updateLocation" />
  </div>
</template>

<script>
import DailyWeather from "@/components/dailyWeather.vue";
import LocationInput from "@/components/locationInput.vue";
import CurrentWeather from "@/components/currentWeather.vue";

export default {
  name: "HomeView",
  components: {
    DailyWeather,
    LocationInput,
    CurrentWeather,
  },
  data() {
    return {
      location: {
        lat: null,
        lng: null,
      },
      geolocationAvailable: false,
    };
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
    updateLocation(coordinates) {
      this.location.lng = coordinates[0];
      this.location.lat = coordinates[1];
    },
  },
};
</script>

<style></style>
