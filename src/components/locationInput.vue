<template>
  <div class="locationInput">
    <div class="formContainer">
      <div class="formInput">
        <div class="title">
          <img src="@/assets/icons/wi-day-cloudy.svg" alt="GeoMeteo" />
          <h1>GeoMeteo</h1>
        </div>
        <form @submit.prevent="submitLocation">
          <input type="text" placeholder="Enter location" name="locationName" />
          <button type="submit">Submit</button>
        </form>
        <div class="useLocation" @click="useCurrentLocation">
          <img
            src="@/assets/icons/8324266_ui_essential_app_location_map_icon.svg"
            alt="Location"
          />
          <h4>Use your current location</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import geocoding from "@/services/geocoding.js";

export default {
  name: "LocationInput",
  data() {
    return {
      locationCoordinates: [],
    };
  },
  methods: {
    submitLocation(event) {
      const name = event.target.elements.locationName.value;
      return this.coordinates(name);
    },
    async coordinates(address) {
      try {
        const response = await geocoding.getCoordinates(address);
        this.locationCoordinates =
          response.data.features[0].geometry.coordinates;
        this.$emit("coordinatesUpdated", this.locationCoordinates);
      } catch (error) {
        console.error("Error fetching address: ", error);
      }
    },
    useCurrentLocation() {
      this.$emit("useCurrentLocation");
    },
  },
};
</script>

<style scoped>
html,
body {
  height: 100%;
  margin: 0;
}

.locationInput {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.formContainer {
  width: 100%;
  background-color: #63c9ff;
  padding-top: 30px;
  padding-bottom: 40px;
  padding-left: 15px;
  padding-right: 15px;
  box-shadow: 0px 0px 14px -5px rgba(0, 0, 0, 0.14);
}

.formInput {
  margin: auto;
  max-width: 500px;
  width: 100%;
}

form {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.title {
  display: flex;
  width: 100%;
}
.title img {
  width: 70px;
}

input {
  width: 80%;
  border: none;
  height: 38px;
  font-size: large;
  padding-left: 15px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.formInput button {
  width: 20%;
  min-width: 95px;
  height: 40px;
  background-color: #00b3ff;
  border: none;
  font-size: large;
  color: white;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.useLocation img {
  width: 20px;
  padding-right: 5px;
}

.useLocation {
  margin-top: 15px;
  display: flex;
  align-items: center;
  padding: 5px;
}

h4 {
  margin: 0;
  padding: 0;
  text-decoration: underline;
  cursor: pointer;
}
</style>
