import React from "react";
import loginImg from "../../login.svg";
import PropTypes from 'prop-types';
export class Register extends React.Component {
  static propTypes ={
    handleRegister: PropTypes.func,
    handleRegisterChange: PropTypes.func,
    registerDetails:PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.onChange = props.handleRegisterChange.bind(this);
    this.onSubmit = props.handleRegister.bind(this);
    this.details = props.registerDetails;
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef} style={{height:"500px", overflowY:"auto"}}>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input defaultValue={this.details.username} type="text" name="username" onChange={this.onChange} placeholder="Username" />
            </div>
            <div className="form-group">
              <label htmlFor="username">Password</label>
              <input defaultValue={this.details.password} type="password" name="password" onChange={this.onChange} placeholder="Password" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input defaultValue={this.details.email} type="text" name="email" onChange={this.onChange} placeholder="Email" />
            </div>
            <div className="form-group">
              <label htmlFor="firstname">First Name</label>
              <input defaultValue={this.details.firstname} type="text" name="firstname" onChange={this.onChange} placeholder="First Name" />
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Last Name</label>
              <input defaultValue={this.details.lastname} type="text" name="lastname" onChange={this.onChange} placeholder="Last Name" />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select id="gender" name="gender" defaultValue={this.details.gender} onChange={this.onChange}>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="branch">Branch</label>
              <input defaultValue={this.details.branch} type="text" name="branch" onChange={this.onChange} placeholder="Branch" />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input defaultValue={this.details.city} type="text" name="city" onChange={this.onChange} placeholder="City" />
            </div>
            <div className="form-group">
              <label htmlFor="cgpa">Cgpa</label>
              <input defaultValue={this.details.cgpa} type="text" name="cgpa" onChange={this.onChange} placeholder="CGPA" />
            </div>
            <div className="form-group">
              <label htmlFor="work_experience">Work Experience</label>
              <input defaultValue={this.details.work_experience} type="number" name="work_experience" onChange={this.onChange} placeholder="Work Experience" />
            </div>
            <div className="form-group">
              <label htmlFor="graduation_year">Graduation Year</label>
              <input defaultValue={this.details.graduation_year} type="number" name="graduation_year" onChange={this.onChange} placeholder="Graduation Year" />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" onClick={this.onSubmit} className="btn">
            Register
          </button>
        </div>
      </div>
    );
  }
}
