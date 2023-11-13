<template>
  <div>
    <div v-if="location.lat">
      <div class="allWeather">
        <AllWeather :lat="location.lat" :lng="location.lng" />
      </div>
    </div>
    <div v-else>
      <LocationInput
        @coordinatesUpdated="updateLocation"
        @useCurrentLocation="getCurrentLocation"
      />
    </div>
  </div>
</template>

<script>
import LocationInput from "@/components/locationInput.vue";
import AllWeather from "@/components/allWeather.vue";

export default {
  name: "HomeView",
  components: {
    LocationInput,
    AllWeather,
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
  methods: {
    async getCurrentLocation() {
      if (navigator.geolocation) {
        try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });

          this.location.lat = position.coords.latitude;
          this.location.lng = position.coords.longitude;
          this.geolocationAvailable = true;
        } catch (error) {
          if (error.code === error.PERMISSION_DENIED) {
            const enableGeolocation = confirm(
              "Please enable geolocation for this site in your browser settings."
            );
          } else {
            console.error("Error getting location: ", error.message);
          }
          this.geolocationAvailable = false;
        }
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

<style scoped>
.allWeather {
  margin: auto;
  max-width: 500px;
  padding-left: 15px;
  padding-right: 15px;
  background-color: rgb(223, 223, 223);
}
</style>
