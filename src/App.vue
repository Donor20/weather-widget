<template>
  <div id="app">
    <weather-container :mode="mode" />
  </div>
</template>

<script>
import WeatherContainer from "./components/WeatherContainer";

export default {
  name: 'App',
  props: ['mode'],
  components: {
    WeatherContainer
  }
}
</script>
