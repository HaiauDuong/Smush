import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {postTodo} from '../store/todo'

class Todos extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      taskName: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  async handleChange(event) {
    await this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.postTodo(this.state.taskName)
    this.setState({
      taskName: ''
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="taskName">
            <h2>ADD TASK:</h2>
          </label>
          <input
            name="taskName"
            type="text"
            value={this.state.taskName}
            onChange={this.handleChange}
          />
          <button type="submit">Add Task</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allTodos: state.todo.allTodos
  }
}
const mapDispatchToProps = dispatch => {
  return {
    postTodo: todo => dispatch(postTodo(todo))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Todos)
