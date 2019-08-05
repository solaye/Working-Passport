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
			message: '',
			modalDisplay: false,
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

		if(this.state.username.length === 0 || this.state.password.length === 0 || this.state.password2 === 0){
			this.setState({
				message: "fill out all fields",
				modalDisplay: true
			})
			// REMOVE ALERT AND CHANGE TO MODAL
			window.alert(this.state.message) 
		} else if (this.state.password2 !== this.state.password){
			this.setState({
				message: "passwords don't match",
				modalDisplay: true
			})
			// REMOVE ALERT AND CHANGE TO MODAL
			window.alert(this.state.message)
		} else if (this.state.password.length < 6 || this.state.password2.length < 6){
			this.setState({
				message: "make password longer than 6 characters",
				modalDisplay: true
			})
			// REMOVE ALERT AND CHANGE TO MODAL
			window.alert(this.state.message)
		} else {
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
	}


render() {
	if (this.state.redirectTo) {
		return <Redirect to={{ pathname: this.state.redirectTo }} />
	} else {
		}
	return (
		<div>
			<div class="modal fade" id="validationModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					...
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
					<button type="button" class="btn btn-primary">Save changes</button>
				</div>
				</div>
			</div>
			</div>
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
					type="password"
					id="password"
					placeholder="Password"
					name="password"
					value={this.state.password}
					onChange={this.handleChange}
					/>
					<h7>Re-Enter Password:</h7>
					<Input
					type="password"
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
		</div>

	)}
}
}

export default Signup
