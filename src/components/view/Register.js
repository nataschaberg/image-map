import React, { Component } from "react"

class Register extends Component {
    constructor() {
        super()
        this.state = {
            registration: {
                username: "",
                password: ""
            }
        }
    }

    updateRegistration(event) {
        let updated = Object.assign({}, this.state.registration)
        updated[event.target.id] = event.target.value
        this.setState({
            registration: updated
        })
    }

    submitRegistration(event){
        event.preventDefault()
        if(this.state.registration.username.length == 0){
            alert("please enter username")
        }
        if(this.state.registration.password.length == 0){
            alert("please enter password")
        }
        this.props.onRegister(this.state.registration)
    }

    submitLoginCredentials(event){
        event.preventDefault()
        if(this.state.registration.username.length == 0){
            alert("please enter username")
        }
        if(this.state.registration.password.length == 0){
            alert("please enter password")
        }
        this.props.onLogin(this.state.registration)
    }

    render() {
        return(
            <div>
                <h2>Sign Up</h2>
                <input id="username" onChange={this.updateRegistration.bind(this)} type="text" placeholder="Username" /><br />
                <input id="password" onChange={this.updateRegistration.bind(this)} type="password" placeholder="Password" /><br />
                <button className="button fit"  onClick={this.submitRegistration.bind(this)} >Join</button>
                <br />
                <button className="button fit" onClick={this.submitLoginCredentials.bind(this)} >Sign In</button>
                <br />
            </div>

        )
    }
}

export default Register
