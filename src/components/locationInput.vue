<template>
  <div class="locationInput">
    <div class="formInput">
      <form @submit.prevent="submitLocation">
        <input type="text" placeholder="Enter location" name="locationName" />
        <button type="submit">Submit</button>
      </form>
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
  },
};
</script>

<style scoped>
.locationInput {
  display: flex;
  align-items: center;
  max-width: 500px;
  height: 100vh;
  margin: auto;
  padding-left: 15px;
  padding-right: 15px;
}

form {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.formInput {
  width: 100%;
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
</style>
