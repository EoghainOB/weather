<template>
  <HomeView />
</template>

<script>
import HomeView from "@/views/HomeView.vue";

export default {
  components: { HomeView },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;600&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Merriweather:wght@700&display=swap");

body {
  display: block;
  margin: 0;
  padding: 0;
  background-color: #d4d4d4;
}

h1 {
  font-family: "Merriweather", serif;
}

h2,
h3,
h4,
p,
input,
label,
a {
  font-family: "Noto Sans", sans-serif;
}
</style>
