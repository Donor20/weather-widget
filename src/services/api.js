import axios from 'axios'

class API {
  get appid() {
    return process.env.VUE_APP_WEATHER_API_KEY
  }
  getWeatherByCity(city) {
    const path = '//api.openweathermap.org/data/2.5/weather';
    const config = {
      params: {
        q: city,
        appid: this.appid,
        units: 'metric'
      }
    };
    return axios.get(path, config).then(response => response.data)
  }
  getWeatherByCoords(lat, lon) {
    const path = '//api.openweathermap.org/data/2.5/weather';
    const config = {
      params: {
        lat, lon,
        appid: this.appid,
        units: 'metric'
      }
    };
    return axios.get(path, config).then(response => response.data)
  }
}

export default new API()
