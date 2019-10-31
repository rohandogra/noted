import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import axios from "./config/axios"
import { setUser } from "./action/user"

import configureStore from "./store/configureStore"
import App from "./App"

const store = configureStore()

store.subscribe(() => {
  console.log(store.getState())
})

//* handle page reload
if (localStorage.getItem("authToken")) {
  axios
    .get("/users/account", {
      headers: {
        "x-auth": localStorage.getItem("authToken")
      }
    })
    .then(response => {
      const login = response.data
      store.dispatch(setUser(login))
    })
}

const ele = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(ele, document.getElementById("root"))
