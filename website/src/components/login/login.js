import React from "react";
import loginImg from "../../login.svg";
import PropTypes from 'prop-types';
export class Login extends React.Component {
  static propTypes ={
    handleLogin: PropTypes.func,
    handleLoginChange: PropTypes.func,
    loginDetails:PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.onChange = props.handleLoginChange.bind(this);
    this.onSubmit = props.handleLogin.bind(this);
    this.details = props.loginDetails;
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
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
              <label htmlFor="password">Password</label>
              <input defaultValue={this.details.password} type="password" name="password" onChange={this.onChange} placeholder="Password" />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" onClick={this.onSubmit} className="btn">
            Login
          </button>
        </div>
      </div>
    );
  }
}
