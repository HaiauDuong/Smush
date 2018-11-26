import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

class Account extends React.Component {
  constructor() {
    super()
    this.state = {
      city: undefined
    }
  }

  getWeather = e => {
    e.preventDefault()
    const city = e.target.city.value

    this.setState({
      city
    })
  }

  async addCity(id, city) {
    try {
      await axios.put(`/api/userSettings/${id}`, {city: city, userId: id})
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    return (
      <div>
        <h1>City</h1>
        <form onSubmit={this.getWeather}>
          <input
            className="weatherForm"
            type="text"
            name="city"
            placeholder="City..."
          />
          <button className="weatherForm"> Save </button>
        </form>

        <button
          className="weatherForm"
          onClick={() => this.addCity(this.props.id, this.state.city)}
        >
          {' '}
          Submit{' '}
        </button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    id: state.user.id
  }
}

export default connect(mapState)(Account)
