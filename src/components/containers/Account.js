import React, { Component } from "react"
import { Register } from "../view"
import { connect } from "react-redux"
import actions from "../../actions"


class Account extends Component {


    componentDidMount(){
        //check for current user
        this.props.checkCurrentUser()
    }


    register(registration){
        this.props.signup(registration)
    }


    login(credentials) {
        this.props.login(credentials)
    }

    render(){
        const currentUser = this.props.account.user
        return(
            <div>
                { (currentUser != null) ? <h3>{currentUser.username}</h3>:
                    <Register onLogin={this.login.bind(this)} onRegister={this.register.bind(this)} />
                }
            </div>
        )
    }
}

const stateToProps = (state) => {
    return {
        account: state.account
    }
}

const dispatchToProps = (dispatch) => {
    return {
        signup: (params) => dispatch(actions.signup(params)),
        login: (params) => dispatch(actions.login(params)),
        checkCurrentUser: () => dispatch(actions.checkCurrentUser())
    }
}

export default connect(stateToProps, dispatchToProps) (Account)
