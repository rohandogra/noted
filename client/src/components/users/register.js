import React from "react"

export default class Register extends React.Component {
  constructor() {
    super()
    this.state = {
      username: "",
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
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }
    console.log(formData)
    this.setState({
      username: "",
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
          <label htmlFor="username">Email</label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
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
