function Input (props){
    <div className="form-group">
					<div className="col-1 col-ml-auto">
						<label className="form-label" htmlFor="username">Username</label>
					</div>
					<div className="col-3 col-mr-auto">
						<input className="form-input"
							type="text"
							id={props.id}
							name={props.id}
							placeholder={props.text}
							value={this.state.username}
							onChange={this.handleChange}
						/>
					</div>
}