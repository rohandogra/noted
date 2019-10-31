import axios from "../config/axios"

export const setUser = user => {
  return {
    type: "SET_USER",
    payload: user
  }
}

export const startSetUser = formData => {
  return dispatch => {
    axios.post("/users/login", formData).then(response => {
      if (response.data.hasOwnProperty("errors")) {
        alert(response.data.errors)
      } else {
        localStorage.setItem("authToken", response.data.token.token)
        dispatch(setUser({ id: 1, name: "asdas" }))
        console.log("token", response.data.token)
      }
    })
  }
}
