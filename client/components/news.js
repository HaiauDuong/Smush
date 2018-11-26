import React from 'react'
import {Link} from 'react-router-dom'

export default class News extends React.Component {
  render() {
    return (
      <div>
        {this.props.news.slice(0, 5).map(article => {
          return (
            <div className="newsContainer">
              <h1>{article.title}</h1>
              <p>{article.source.name}</p>
              <a>{article.desciption}</a>
              <a>{article.content}</a>
            </div>
          )
        })}
      </div>
    )
  }
}
