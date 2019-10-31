import React from "react"
import axios from "../../config/axios"

export default class category extends React.Component {
  constructor() {
    super()
    this.state = {
      categorys: []
    }
  }
  componentDidMount() {
    axios
      .get("/users/categorys")
      .then(response => {
        const categorys = response.data
        this.setState({ categorys })
        console.log(this.state.categorys)
      })
      .catch(err => console.log(err))
  }
  handleRemove = id => {
    axios
      .delete(`/users/categorys/${id}`)
      .then(
        this.setState(prevstate => ({
          categorys: prevstate.categorys.filter(category => category._id !== id)
        }))
      )
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <h2>Category Listing-{this.state.categorys.length}</h2>
        <ul>
          {this.state.categorys.map(category => {
            return (
              <li>
                {category.name}{" "}
                <button
                  onClick={() => {
                    this.handleRemove(category._id)
                  }}
                >
                  delete
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
