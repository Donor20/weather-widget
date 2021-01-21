<template>
  <div class="weatherCard">
    <div v-if="data">
      <div class="title">{{cityName}}</div>
      <div class="text-center">
        <div class="d-inline-flex align-items-center">
          <img :src="weatherIcon" class="weatherIcon">
          <p class="weatherTemp">{{temp}}</p>
        </div>
      </div>
      <p>Feels like {{feelsLike}}. {{weatherDescription}}. {{windDescription}}.</p>
      <div class="row">
        <p class="col-6">
          <b-icon icon="cursor-fill" :rotate="windDeg - 45"/>
          {{windSpeed}} {{windDegWord}}
        </p>
        <p class="col-6">
          <b-iconstack>
            <b-icon stacked icon="arrow-right-short" rotate="-45" shift-v="1.0" shift-h="1.0"/>
            <b-icon stacked icon="slash"/>
            <b-icon stacked icon="dot"/>
            <b-icon stacked icon="circle"/>
          </b-iconstack>
          {{pressure}}
        </p>
        <p class="col-6">Humidity: {{humidity}}</p>
        <p class="col-6">Dew point: {{humidity}}</p>
        <div class="col">Visibility: {{visibility}}</div>
      </div>
    </div>
    <div v-else class="title">{{city}}</div>
  </div>
</template>

<script>
import api from '../services/api'

export default {
  name: 'WeatherInfo',
  props: ['city'],
  data() {
    return {
      data: null
    }
  },
  computed: {
    cityName() {
      return `${this.data.name}, ${this.data.sys.country}`
    },
    weatherIcon() {
      return `http://openweathermap.org/img/wn/${this.data.weather[0].icon}@2x.png`
    },
    temp() {
      return this.data.main.temp + '°C'
    },
    feelsLike() {
      return this.data.main.feels_like + '°C'
    },
    weatherDescription() {
      const description = this.data.weather[0].description;
      return description.charAt(0).toUpperCase() + description.slice(1)
    },
    windDescription() {
      const speed = this.data.wind.speed;
      if (speed < 0.5) return 'Calm';
      if (speed < 2) return 'Light air';
      if (speed < 3.5) return 'Light breeze';
      if (speed < 5.5) return 'Gentle breeze';
      if (speed < 8.5) return 'Moderate breeze';
      if (speed < 11) return 'Fresh breeze';
      if (speed < 14) return 'Strong breeze';
      if (speed < 17) return 'Moderate gale';
      if (speed < 20.5) return 'Fresh gale';
      if (speed < 24) return 'Strong gale';
      if (speed < 28) return 'Whole gale';
      if (speed < 32) return 'Storm';
      return 'Strong gale';
    },
    windSpeed() {
      return this.data.wind.speed + 'm/s'
    },
    windDeg() {
      return this.data.wind.deg
    },
    windDegWord() {
      let value = this.windDeg;
      if (value <= 11.25) return 'N';
      value -= 11.25;
      const allDirections = [
        'NNE', 'NE', 'ENE',
        'E', 'ESE', 'SE', 'SSE',
        'S', 'SSW', 'SW', 'WSW',
        'W', 'WNW', 'NW', 'NNW',
        'N'
      ];
      const index = parseInt(value / 22.5);
      return allDirections[index] ? allDirections[index] : 'N';
    },
    pressure() {
      return this.data.main.pressure + 'hPa'
    },
    humidity() {
      return this.data.main.humidity + '%'
    },
    visibility() {
      return this.data.visibility / 1000 + 'km'
    }
  },
  mounted() {
    api.getWeatherByCity(this.city).then(data => {
      this.data = data
    })
  }
}
</script>

<style lang="scss" scoped>
.weatherCard {
  .weatherIcon {
    width: 150px;
    height: 150px;
    margin-right: -20px;
    margin-left: -50px;
  }
  .weatherTemp {
    font-size: 32px;
    font-weight: bold;
  }
}
</style>
