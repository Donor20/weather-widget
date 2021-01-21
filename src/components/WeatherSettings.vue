<template>
  <div class="weatherCard">
    <div class="title">Settings</div>
    <draggable v-model="cities">
      <div v-for="city in cities" :key="city" class="cityLine d-flex align-items-center">
        <b-icon icon="list" class="moveBtn" />
        <div>{{city}}</div>
        <b-icon @click="removeCity(city)" icon="trash" class="clickable ml-auto" />
      </div>
    </draggable>
    <div class="mt-4">Add location:</div>
    <b-form @submit="addCity" class="d-flex align-items-center">
      <b-form-input v-model="newCityName" />
      <b-icon type="submit" class="clickable enterBtn" icon="arrow90deg-right" rotate="180"/>
    </b-form>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: "WeatherSettings",
  components: { draggable },
  data() {
    return {
      newCityName: ''
    }
  },
  computed: {
    cities: {
      get() {
        return this.$store.getters.cities
      },
      set(value) {
        this.$store.dispatch('updateCities', value)
      }
    }
  },
  methods: {
    removeCity(city) {
      this.$store.dispatch('removeCity', city)
    },
    addCity(event) {
      event.stopPropagation();
      event.preventDefault();
      this.$store.dispatch('addCity', this.newCityName);
      this.newCityName = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.weatherCard {
  .cityLine {
    padding: 8px;
    margin-bottom: 4px;
    background-color: #ecebe9;
  }
  .moveBtn {
    cursor: move;
    width: 20px;
    height: 20px;
    margin-right: 4px;
  }
  .enterBtn {
    width: 40px;
    height: 20px;
  }
}
</style>
