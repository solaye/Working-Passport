import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Input from './form/Input'
import SubmitButton from "./form/SubmitButton"
import MyModal from './Modal'
import { STATES } from 'mongoose';
// import Example from './Modal'

class Signup extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			password2: '',
			confirmPassword: '',
			heading: '',
			message: '',
			modalDisplay: true,
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
	closeModal = () => {
		this.setState({
			modalDisplay: false
		})
	}
	
	handleSubmit(event) {
		console.log('sign-up handleSubmit, username: ')
		console.log(this.state.username)
		event.preventDefault()
		this.setState({
			modalDisplay: true
		})

		if(this.state.username.length === 0 || this.state.password.length === 0 || this.state.password2 === 0){
			this.setState({
				message: "fill out all fields",
				heading: "FORM ERROR",
				modalDisplay: true
			})
			// REMOVE ALERT AND CHANGE TO MODAL
		} else if (this.state.password2 !== this.state.password){
			this.setState({
				message: "passwords don't match",
				heading: 'PASSWORD ERROR'
			})
			// REMOVE ALERT AND CHANGE TO MODAL
		} else if (this.state.password.length < 6 || this.state.password2.length < 6){
			this.setState({
				message: "make password longer than 6 characters",
				heading: 'PASSWORD ERROR'
			})
			// REMOVE ALERT AND CHANGE TO MODAL
		} else {
			//request to server to add a new username/password
			axios.post('/user/', {
				username: this.state.username,
				password: this.state.password
			})
		// 		.then(response => {
		// 			console.log(response)
		// 			if (!response.data.errmsg) {
		// 				console.log('successful signup')
		// 				this.setState({ //redirect to login page
		// 					redirectTo: '/'
		// 				})
		// 			} else {
		// 				console.log('username already taken')
		// 			}
		// 		}).catch(error => {
		// 			console.log('signup error: ')
		// 			console.log(error)
	
		// 		})

		}
	}


render() {
	if (this.state.redirectTo) {
		return <Redirect to={{ pathname: this.state.redirectTo }} />
	} else {
	return (
		<div>
			{this.state.modalDisplay ? 
				<MyModal
				message={this.state.message}
				heading={this.state.heading} 
				close={this.closeModal}
				open={this.state.modalDisplay}
				/> :
				null
			}
			{/* <Example/> */}
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

	)}}
}


export default Signup
