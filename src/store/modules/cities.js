import api from "../../services/api";

export default {
  state: {
    cities: []
  },
  getters: {
    cities: state => {
      return state.cities
    }
  },
  mutations: {
    addCity (state, city) {
      if (!city || state.cities.indexOf(city) !== -1) return;
      api.getWeatherByCity(city).then(data => {
        if (state.cities.indexOf(data.name) !== -1) return;
        state.cities.push(data.name);
        this.commit('updateCities', state.cities)
      })
    },
    removeCity(state, city) {
      const index = state.cities.indexOf(city);
      if (index > -1) {
        state.cities.splice(index, 1)
      }
      this.commit('updateCities', state.cities)
    },
    updateCities(state, cities) {
      state.cities = cities;
      localStorage.setItem('weather-widget-cities', JSON.stringify(state.cities))
    },
    init(state) {
      const data = localStorage.getItem('weather-widget-cities');
      let cities;
      if (data) cities = JSON.parse(data);
      if (Array.isArray(cities) && cities.length) {
        state.cities = cities
      } else {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            api.getWeatherByCoords(position.coords.latitude, position.coords.longitude)
              .then(data => {
                state.cities = [data.name];
                this.commit('updateCities', state.cities)
              })
          });
        } else {
          console.error("Geolocation is not supported by this browser.");
        }
      }
    }
  },
  actions: {
    addCity ({ commit }, city) {
      commit('addCity', city)
    },
    removeCity({ commit }, city) {
      commit('removeCity', city)
    },
    updateCities({ commit }, cities) {
      commit('updateCities', cities)
    },
    init({ commit }) {
      commit('init')
    }
  }
}
