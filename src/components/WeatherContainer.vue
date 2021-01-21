<template>
  <div class="weatherContainer" :class="{
    vertical: mode === 'vertical',
    horizontal: mode === 'horizontal',
  }">
    <b-icon :icon="isSettings ? 'X' : 'gear'"
            class="settingsButton clickable"
            @click="isSettings = !isSettings"
    />
    <weather-settings v-if="isSettings"/>
    <weather-list v-else/>
  </div>
</template>

<script>
import WeatherSettings from "./WeatherSettings";
import WeatherList from "./WeatherList";

export default {
  name: "WeatherContainer",
  props: {
    mode: {
      type: String,
      default: 'vertical'
    }
  },
  components: {WeatherList, WeatherSettings},
  data() {
    return {
      isSettings: false
    }
  },
  created() {
    this.$store.dispatch('init')
  }
}
</script>

<style lang="scss">
$w-card-width: 300px;

.weatherContainer {
  &.vertical {
    width: $w-card-width;
  }
  &.horizontal {
    .weatherList {
      display: flex;
      overflow: auto;
    }
    .weatherCard {
      min-width: $w-card-width;
      max-width: $w-card-width;
    }
  }

  position: relative;
  .weatherCard {
    padding: 16px;
    .title {
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 8px;
    }
  }
}
.clickable {
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
}
.settingsButton {
  width: 22px;
  height: 22px;
  position: absolute;
  right: 16px;
  top: 16px;
}
</style>
