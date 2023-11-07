<template>
  <form @submit.prevent="submitLocation">
    <input type="text" placeholder="Enter location" name="locationName" />
    <button type="submit">Submit</button>
  </form>
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
  },
};
</script>

<style></style>
