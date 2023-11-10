<template>
  <div>
    <div v-if="location.lat">
      <div class="allWeather">
        <AllWeather :lat="location.lat" :lng="location.lng" />
      </div>
    </div>
    <div v-else>
      <LocationInput @coordinatesUpdated="updateLocation" />
    </div>
    <div v-if="loading">Loading...</div>
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
      loading: true,
      geolocationAvailable: false,
    };
  },
  mounted() {
    this.getLocation();
  },
  methods: {
    async getLocation() {
      if (navigator.geolocation) {
        try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });

          this.location.lat = position.coords.latitude;
          this.location.lng = position.coords.longitude;
          this.geolocationAvailable = true;
        } catch (error) {
          this.geolocationAvailable = false;
        } finally {
          this.loading = false;
        }
      } else {
        console.error("Geolocation is not supported in this browser.");
        this.geolocationAvailable = false;
        this.loading = false;
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
