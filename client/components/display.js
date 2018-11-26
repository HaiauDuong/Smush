import React from 'react'
import {connect} from 'react-redux'
import {fetchWeather} from '../store/weather'
import {addCity} from '../store/user'

import Weather from './weather'
import Clock from './clock'
import News from './news'
import Popup from './popup'
import Alarm from './alarm'
import Quote from './quote'
import axios from 'axios'


const API_KEY = 'c241cd9f12775ab16dd207ba3c903aba'
const NHL_KEY = '567b09e057754172bd84020c11a7e786'

class Display extends React.Component {
  state = {
    temp: undefined,
    city: undefined,
    weather: undefined,
    description: undefined,
    news: [],
    toggle: false,
    nhlToggle: false,
    alarmToggle: false,
    isLoggedIn: false
  }

  componentDidMount() {
    if (this.props.id !== undefined) {
      this.logIn()
    }
  }

  async logIn() {
    const res = await axios.get(`/api/userSettings/${this.props.id}`)
    if (res.data !== null) {
      this.setState({isLoggedIn: true})
      this.findCity()
    }
  }

  async findCity() {
    const res = await axios.get(`/api/userSettings/${this.props.id}`)
    const userCity = res.data.city
    const apiCall = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${API_KEY}&units=imperial`
    )
    const data = await apiCall.json()

    this.setState({
      temp: data.main.temp,
      city: data.name,
      weather: data.weather[0].id,
      description: data.weather[0].description,
      toggle: true
    })
  }

  getNhlFeed = async e => {
    e.preventDefault()
    const nhlCall = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NHL_KEY}`
    )
    const data = await nhlCall.json()
    let news = this.state.nhlToggle
    this.setState({
      news: data,
      nhlToggle: !news
    })
  }

  getWeatherCity = async e => {
    e.preventDefault()
    const city = e.target.city.value
    const apiCall = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`
    )
    const data = await apiCall.json()

    this.setState({
      temp: data.main.temp,
      city: data.name,
      weather: data.weather[0].id,
      description: data.weather[0].description,
      toggle: true,
      isLoggedIn: true
    })
  }

  getWeatherZip = async e => {
    e.preventDefault()
    const zip = e.target.city.value
    const apiCall = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${API_KEY}&units=imperial`
    )
    const data = await apiCall.json()

    this.setState({
      temp: data.main.temp,
      city: data.name,
      weather: data.weather[0].id,
      description: data.weather[0].description,
      toggle: true,
      isLoggedIn: true
    })
  }

  handleAlarm() {
    this.setState({alarmToggle: !this.state.alarmToggle})
  }

  render() {
    return (
      <div>
        {this.state.isLoggedIn ? null : (
          <div className="getWeather">
            <form onSubmit={this.getWeatherCity}>
              <input
                className="weatherForm"
                type="text"
                name="city"
                placeholder="City..."
              />
              <button className="weatherForm"> Get Weather </button>
            </form>
            <form onSubmit={this.getWeatherZip}>
              <input
                className="weatherForm"
                type="text"
                name="city"
                placeholder="Zip Code..."
              />
              <button className="weatherForm"> Get Weather </button>
            </form>
          </div>
        )}
        <div className="displayContainer">
          <aside>
            <Clock />
          </aside>

          <aside>
            <h1>City: {this.state.city}</h1>
            <h2>{this.state.temp}°F</h2>
          </aside>

          <aside className="Weather">
            {this.state.toggle && (
              <Weather
                weather={this.state.weather}
                description={this.state.description}
              />
            )}
          </aside>
        </div>

        <div className="bottomContainer">
          <div>
            {this.state.alarmToggle ? (
              <div>
                <button
                  className="newsButton"
                  onClick={() => this.handleAlarm()}
                >
                  Hide Alarm
                </button>
                <Alarm />
              </div>
            ) : (
              <button className="newsButton" onClick={() => this.handleAlarm()}>
                Set Alarm
              </button>
            )}
          </div>
          <div>
            <Popup />
          </div>

          <div>
            <form onSubmit={this.getNhlFeed}>
              {this.state.nhlToggle ? (
                <button className="newsButton"> Hide News </button>
              ) : (
                <button className="newsButton"> Get News </button>
              )}
            </form>
            {this.state.nhlToggle && <News news={this.state.news.articles} />}
          </div>
        </div>

        <div>
          <Quote />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    weather: state.weather,
    id: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getWeather: () => dispatch(fetchWeather()),
    addCity: (id, city) => dispatch(addCity(id, city))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Display)
