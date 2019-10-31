import React from "react"
import "./App.css"
import { BrowserRouter, Route, Link } from "react-router-dom"
import categoryList from "./components/categorys/categoryList"
import Register from "./components/users/register"
import Login from "./components/users/login"
import { connect } from "react-redux"

function App(props) {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Notes App</h1>
        {Object.keys(props.user).length === 0 ? (
          <div>
            <Link to="/users/register">Register</Link>{" "}
            <Link to="/users/login">Login</Link>
          </div>
        ) : (
          <div>
            <Link to="/users/accounts">Account Settings</Link>{" "}
            <Link to="/users/logout">logout</Link>
          </div>
        )}
        <Link to="/users/notes">Notes</Link>{" "}
        <Link to="/users/category">Category</Link>{" "}
        {/* <Route path="/notes" component={notesList} /> */}
        <Route path="/users/category" component={categoryList} />
        <Route path="/users/register" component={Register} />
        <Route path="/users/Login" component={Login} />
      </div>
    </BrowserRouter>
  )
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(App)
