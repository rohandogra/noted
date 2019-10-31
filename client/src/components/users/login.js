import React from "react"
import { startSetUser } from "../../action/user"
import { connect } from "react-redux"

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      email: "",
      password: ""
    }
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    const formData = {
      email: this.state.email,
      password: this.state.password
    }
    console.log(formData)
    this.props.dispatch(startSetUser(formData))
    this.setState({
      email: "",
      password: ""
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <br />
          <br />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <input type="submit" />
        </form>
      </div>
    )
  }
}

export default connect()(Login)
