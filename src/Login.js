import React, { Component } from 'react'
import { login, auth } from './firebase_utils/auth'
import { isAuthenticated } from './firebase_utils/constants'
import Button from './components/common/Button'


export default class Login extends Component {
    constructor(){
        super()
        this.state = { email: '', password: '' }
    }
    handleEmailChange = (e) => {
        e.preventDefault()
        this.setState({email: e.target.value});
    }
    handlePasswordChange = (e) => {
        e.preventDefault()
        this.setState({password: e.target.value});
    }
    handleLogin = (e) => {
        e.preventDefault()
        login(this.state.email, this.state.password)
        this.setState({email: '', password: ''})
    }
    handleRegister = (e) => {
        e.preventDefault()
        auth(this.state.email, this.state.password).then(console.log("registered"))
        this.setState({email: '', password: ''})
    }
    render () {
        return (
            isAuthenticated() ?
                <p>Welcome back !</p> :
                <div className="col-sm-6 col-sm-offset-3">
                    <h1> Login </h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Email</label>
                            <input id="email" className="form-control" value={this.state.email}
                                   onChange={this.handleEmailChange} placeholder="Email"/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input id="password" type="password" className="form-control"  value={this.state.password}
                                   onChange={this.handlePasswordChange}placeholder="Password"/>
                        </div>
                        <Button id="login" title="Login" handleSubmit={this.handleLogin}/>
                        <Button id="register" title="Register" handleSubmit={this.handleRegister}/>
                    </form>
                </div>
        )
    }
}