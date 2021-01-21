<template>
  <div v-if="cities.length" class="weatherList">
    <weather-info v-for="city in cities" :key="city" :city="city"/>
  </div>
  <div v-else class="weatherCard">
    <div class="title">No data</div>
  </div>
</template>

<script>
import WeatherInfo from "./WeatherInfo";

export default {
  name: "WeatherList",
  components: {WeatherInfo},
  computed: {
    cities() {
      return this.$store.getters.cities
    }
  }
}
</script>

<style lang="scss">
.weatherList {
  margin-bottom: -16px;
  .weatherCard {
    margin-bottom: 16px;
  }
}
</style>
