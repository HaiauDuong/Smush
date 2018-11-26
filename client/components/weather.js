import React from 'react'
import SunShowers from './WeatherIcons/SunShowers'
import Cloudy from './WeatherIcons/Cloudy'
import Flurries from './WeatherIcons/Flurries'
import Rainy from './WeatherIcons/Rainy'
import Sunny from './WeatherIcons/Sunny'
import ThunderStorms from './WeatherIcons/ThunderStorms'

class Weather extends React.Component {
  constructor() {
    super()
    this.state = {
      sunShowers: false,
      cloudy: false,
      flurries: false,
      rainy: false,
      sunny: false,
      thunderStorms: false
    }
  }

  componentDidMount() {
    const weather = this.props.weather
    const ThunderStorm = [200, 201, 202, 210, 211, 212, 221, 230, 231, 232]
    const Drizzle = [300, 301, 302, 310, 311, 312, 313, 314, 321]
    const Rain = [500, 501, 502, 503, 504, 511, 520, 521, 522, 531]
    const Snow = [600, 601, 602, 611, 612, 615, 616, 620, 621, 622]
    const Atmosphere = [701, 711, 721, 731, 741, 751, 761, 771, 781]
    const Clear = [800]
    const Clouds = [802, 803, 804]
    const SunShower = [801]

    if (SunShower.includes(weather)) {
      this.setState({
        sunShowers: true
      })
    } else if (Clouds.includes(weather)) {
      this.setState({
        cloudy: true
      })
    } else if (Snow.includes(weather)) {
      this.setState({
        flurries: true
      })
    } else if (Rain.includes(weather) || Drizzle.includes(weather)) {
      this.setState({
        rainy: true
      })
    } else if (Clear.includes(weather)) {
      this.setState({
        sunny: true
      })
    } else if (ThunderStorm.includes(weather)) {
      this.setState({
        thunderStorms: true
      })
    } else {
      this.setState({
        cloudy: true
      })
    }
  }

  render() {
    return (
      <div>
        {this.state.sunShowers && (
          <div>
            <SunShowers /> <h2>{this.props.description}</h2>
          </div>
        )}
        {this.state.cloudy && (
          <div>
            <Cloudy /> <h2>{this.props.description}</h2>
          </div>
        )}
        {this.state.flurries && (
          <div>
            <Flurries /> <h2>{this.props.description}</h2>
          </div>
        )}
        {this.state.rainy && (
          <div>
            <Rainy /> <h2>{this.props.description}</h2>
          </div>
        )}
        {this.state.sunny && (
          <div>
            <Sunny /> <h2>{this.props.description}</h2>
          </div>
        )}
        {this.state.thunderStorms && (
          <div>
            <ThunderStorms /> <h2>{this.props.description}</h2>
          </div>
        )}
      </div>
    )
  }
}

export default Weather
