import React from "react";
import loginImg from "../../login.svg";

export class Register extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="username" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="email" />
            </div>
            <div className="form-group">
              <label htmlFor="firstname">First Name</label>
              <input type="text" name="firstname" placeholder="firstname" />
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Last Name</label>
              <input type="text" name="lastname" placeholder="lastname" />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <input type="text" name="gender" placeholder="gender" />
            </div>
            <div className="form-group">
              <label htmlFor="branch">Branch</label>
              <input type="text" name="branch" placeholder="branch" />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input type="text" name="city" placeholder="city" />
            </div>
            <div className="form-group">
              <label htmlFor="cgpa">Cgpa</label>
              <input type="text" name="cgpa" placeholder="cgpa" />
            </div>
            <div className="form-group">
              <label htmlFor="work_experience">Work Experience</label>
              <input type="text" name="work_experience" placeholder="Work Experience" />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn">
            Register
          </button>
        </div>
      </div>
    );
  }
}
