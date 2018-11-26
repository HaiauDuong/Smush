import React from 'react'

class Alarm extends React.Component {
  constructor() {
    super()
    this.state = {
      currentTime: '',
      alarmTime: '',
      play: false
    }
    this.url = 'http://streaming.tdiradio.com:8000/house.mp3'
    this.audio = new Audio(this.url)
    this.togglePlay = this.togglePlay.bind(this)
    this.setAlarmTime = this.setAlarmTime.bind(this)
  }

  componentDidMount() {
    this.clock = setInterval(() => this.setCurrentTime(), 1000)
    this.interval = setInterval(() => this.checkAlarmClock(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.clock)
    clearInterval(this.interval)
  }

  setCurrentTime() {
    this.setState({
      currentTime: new Date().toLocaleTimeString('en-US', {hour12: false})
    })
  }

  setAlarmTime(event) {
    event.preventDefault()
    const inputAlarmTimeModified = event.target.value + ':00'
    this.setState({
      alarmTime: inputAlarmTimeModified
    })
  }
  togglePlay() {
    this.setState({play: !this.state.play})
    console.log(this.audio)
    this.state.play ? this.audio.play() : this.audio.pause()
  }

  checkAlarmClock() {
    if (this.state.alarmTime === 'undefined' || !this.state.alarmTime) {
      // this.alarmMessage = "Set your alarm.";
    } else {
      // this.alarmMessage = "Alarm set for:";
      if (this.state.currentTime === this.state.alarmTime) {
        this.togglePlay()
        alert('its time!')
      } else {
        console.log('not yet')
      }
    }
  }

  render() {
    return (
      <div>
        <h3>{this.alarmMessage}</h3>
        <form>
          <input type="time" onChange={this.setAlarmTime} />
        </form>
        <button onClick={this.togglePlay}>
          {this.state.play ? 'Pause' : 'Play'}
        </button>
      </div>
    )
  }
}

export default Alarm
