import React from 'react'

class Quote extends React.Component {
  state = {
    quote: undefined,
    author: undefined,
    title: undefined
  }

  async componentDidMount() {
    // e.preventDefault()
    const apiCall = await fetch(`https://talaikis.com/api/quotes/random/`)
    const data = await apiCall.json()

    this.setState({
      quote: data.quote,
      author: data.author
    })
  }

  render() {
    return (
      <div className="quoteContainer">
        {/* <h2>Random Quote</h2> */}
        <div class="scroll-left">
          <p>
            <h3>
              {this.state.quote} - {this.state.author}
            </h3>
          </p>
        </div>
      </div>
    )
  }
}

export default Quote
