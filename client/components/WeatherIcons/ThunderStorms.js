import React from 'react'

export default class ThunderStorms extends React.Component {
  render() {
    return (
      <div>
        <div class="icon thunder-storm">
          <div class="cloud" />
          <div class="lightning">
            <div class="bolt" />
            <div class="bolt" />
          </div>
        </div>
      </div>
    )
  }
}
