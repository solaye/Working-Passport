import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Input from './form/Input'
import SubmitButton from "./form/SubmitButton"

class Signup extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			password2: '',
			confirmPassword: '',
			redirectTo: null

		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleSubmit(event) {
		console.log('sign-up handleSubmit, username: ')
		console.log(this.state.username)
		event.preventDefault()

		//request to server to add a new username/password
		axios.post('/user/', {
			username: this.state.username,
			password: this.state.password
		})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('successful signup')
					this.setState({ //redirect to login page
						redirectTo: '/'
					})
				} else {
					console.log('username already taken')
				}
			}).catch(error => {
				console.log('signup error: ')
				console.log(error)

			})
	}


render() {
	if (this.state.redirectTo) {
		return <Redirect to={{ pathname: this.state.redirectTo }} />
	} else {
	return (
		<div className="SignupForm">
			<h4>Sign up</h4>
			<form className="form-horizontal">
				<Input 
				type="text"
				id="username" 
				placeholder="Username" 
				name="username"
				value={this.state.username}
				onChange={this.handleChange} 
				/>
				<Input
				type="text"
				id="password"
				placeholder="Password"
				name="password"
				value={this.state.password}
				onChange={this.handleChange}
				/>
				<Input
				type="text"
				id="password"
				placeholder="Password"
				name="password2"
				value={this.state.password2}
				onChange={this.handleChange}
				/>
				<SubmitButton 
				className="btn btn-primary col-1 col-mr-auto"
				onClick={this.handleSubmit}
				type="submit"
				text="Sign Up"
				/>
			</form>
		</div>

	)}
}
}

export default Signup
