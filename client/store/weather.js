import axios from 'axios'

const API_KEY = 'c241cd9f12775ab16dd207ba3c903aba'
const NHL_KEY = '567b09e057754172bd84020c11a7e786'

const GET_WEATHER = 'GET_WEATHER'



const initialState = {
    weather: {}
}

const getWeather = weather => ({type: GET_WEATHER, weather})

export const fetchWeather = () => async dispatch => {
    try {
        const {data} = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=manhatten&appid=${API_KEY}&units=imperial`)
        // const {data} = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`)
        dispatch(getWeather(data))
    }
    catch (err) {
        console.error(err)
    }
  }

export default function(state = initialState, action) {
    switch (action.type) {
      case GET_WEATHER:
        return {
            ...state,
            weather: action.weather
        }
      default:
        return state
    }
  }