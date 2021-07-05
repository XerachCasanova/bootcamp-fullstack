import { createStore, combineReducers, applyMiddleware } from 'redux'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import loginReducer from './reducers/loginReducer'
import thunk from 'redux-thunk'


//Next code persists store redux on refresh.
const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem('state', JSON.stringify(state))
  }catch(exception){
    console.error(exception)
  }
}

const loadFromLocalStorage = () => {
  try {
    const stateStr = localStorage.getItem('state')
    return stateStr ? JSON.parse(stateStr): undefined
  }catch (exception) {
    return undefined
  }
}

const reducer = combineReducers({
  userLogin: loginReducer,
  blogs: blogReducer,
  users: userReducer,
  notification: notificationReducer
})

const persistedStore = loadFromLocalStorage()

const store = createStore(
  reducer,
  persistedStore,
  applyMiddleware(thunk)

)

store.subscribe(() => {
  saveToLocalStorage(store.getState())
})

export default store