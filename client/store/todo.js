import axios from 'axios'

const GET_TODO = 'GET_TODO'
const GET_TODOS = 'GET_TODOS'
const MAKE_TODO = 'MAKE_TODO'
const EDIT_TODO = 'EDIT_TODO'
const DELETE_TODO = 'DELETE_TODO'

const initialState = {
  allTodos: []
}

const getTodos = todos => ({type: GET_TODOS, todos})
const makeTodo = todo => ({type: MAKE_TODO, todo})
const deleteTodo = id => ({type: DELETE_TODO, id})

export const fetchTodos = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/todo`)
    dispatch(getTodos(data))
  } catch (err) {
    console.error(err)
  }
}
export const postTodo = todo => async dispatch => {
  try {
    const {data} = await axios.post(`/api/todo`, {taskName: todo})
    dispatch(makeTodo(data))
  } catch (err) {
    console.error(err)
  }
}
export const removeTodo = id => async dispatch => {
  try {
    await axios.delete(`/api/todo/${id}`)
    dispatch(deleteTodo(id))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        allTodos: action.todos
      }
    case MAKE_TODO:
      return {
        ...state,
        allTodos: [...state.allTodos, action.todo]
      }
    case DELETE_TODO:
      return {
        ...state,
        allTodos: [...state.allTodos.filter(todo => todo.id !== action.id)]
      }
    default:
      return state
  }
}
