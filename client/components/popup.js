import React from 'react'
import Todos from './todos'
import {connect} from 'react-redux'
import {fetchTodos, removeTodo} from '../store/todo'

class Popup extends React.Component {
  componentDidMount() {
    this.props.fetchTodos()
  }
  render() {
    return (
      <div>
        <div class="todoButton">
          <a class="button" href="#popup1">
            List of Todos
          </a>
        </div>

        <div id="popup1" class="overlay">
          <div class="popup">
            <a class="close" href="#">
              &times;
            </a>
            <div class="content">
              <div class="panel">
                <div class="panel-head">
                  <h2>({this.props.allTodos.length}) TODO LIST</h2>
                </div>
                <div class="panel-body">
                  <Todos />
                  <form>
                    {this.props.allTodos.map(todo => {
                      return (
                        <div key={todo.id}>
                          <input
                            id={todo.id}
                            class="checkbox-custom"
                            name={todo.id}
                            type="checkbox"
                          />
                          <label for={todo.id} class="checkbox-custom-label">
                            {todo.taskName}{' '}
                            <button
                              className="removeButton"
                              onClick={() => this.props.removeTodo(todo.id)}
                            >
                              <p>-</p>
                            </button>
                          </label>
                        </div>
                      )
                    })}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
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
    fetchTodos: () => dispatch(fetchTodos()),
    removeTodo: id => dispatch(removeTodo(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup)
