import React from "react";
import "./mainpage.scss";
import { Login, Register } from "./index";
import {AuthContext} from '../../auth.js';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import axios from 'axios';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
class Mainpage extends React.Component {
  static contextType = AuthContext;
  constructor(props) {

    super(props);
    this.state = {
      isLogginActive: true,
      isError:false,
      loginDetails:{
        username: '',
        password: '',
      },
      registerDetails:{
        username:'',
        password: '',
        email:'',
        firstname:'',
        lastname:'',
        gender:'',
        branch:'',
        city:'',
        cgpa:'',
        work_experience:'',
        graduation_year:''
      },
      error:'Invalid Credentials!'
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleRegisterChange = this.handleRegisterChange.bind(this);
  }
  handleRegister = ()=>{
    const value = this.state.registerDetails;
    var formData = new FormData();
    for(let key in value){
      if(value[key]===''){
        alert("All Fields are required!");
        return;
      }
      else{
        formData.append(key,value[key]);
      }
    }
    
    axios.post('/api/user/register',formData)
    .then(res=>{
      alert("User Created!");
    })
    .catch(err=>{
      this.setState({
        ...this.state,
        isError:true,
        error:'Username Already Exists!',
      });
      console.log(err);
    });
  }
  handleRegisterChange = (event)=>{
    if(event.target==null) return;
    this.setState({
      ...this.state,
      registerDetails:{
        ...this.state.registerDetails,
        [event.target.name]:event.target.value,
      },
    });
  }
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
      ...this.state,
      isError:false,
    });
  };
  handleLoginChange = (event)=>{
    if(event.target==null) return;
    this.setState({
      ...this.state,
      loginDetails:{
        ...this.state.loginDetails,
        [event.target.name]:event.target.value,
      },
    });
  }
  handleLogin= ()=>{
    if(this.state.loginDetails.username==='' || this.state.loginDetails.password===''){
      alert("Both Fields are required");
      return;
    }
    axios.post('/api/user/login', {
      username: this.state.loginDetails.username,
      password: this.state.loginDetails.password,
    })
    .then(res=>{
      if(res.status===200){
        this.context.setAuthTokens(res.data);
      }
      else{
        this.setState({
          ...this.state,
          isError:true,
        });
      }
    })
    .catch(err=>{
      this.setState({
        ...this.state,
        isError:true,
      });
      console.log(err);
    })
  };
  componentDidMount() {
    //Add .right by default
    this.rightSide.classList.add("right");
  }

  changeState() {
    const { isLogginActive } = this.state;

    if (isLogginActive) {
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
    } else {
      this.rightSide.classList.remove("left");
      this.rightSide.classList.add("right");
    }
    this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
  }

  render() {
    const { isLogginActive } = this.state;
    const current = isLogginActive ? "Register" : "Login";
    const currentActive = isLogginActive ? "login" : "register";
    return (
      <div className="App">
        <Snackbar open = {this.state.isError} anchorOrigin={{ vertical:"top", horizontal:"center" }} onClose={this.handleClose}>
          <Alert onClose={this.handleClose} severity="error">{this.state.error}</Alert>
        </Snackbar>
        <div className="login" >
          <div className="container" ref={ref => (this.container = ref)} >
            {isLogginActive && (
              <Login containerRef={ref => (this.current = ref)} loginDetails={this.state.loginDetails} handleLogin={this.handleLogin} handleLoginChange = {this.handleLoginChange} />
            )}
            {!isLogginActive && (
              <Register  containerRef={ref => (this.current = ref)} registerDetails={this.state.registerDetails} handleRegister={this.handleRegister} handleRegisterChange ={this.handleRegisterChange} />
            )}
          </div>
          <RightSide
            current={current}
            currentActive={currentActive}
            containerRef={ref => (this.rightSide = ref)}
            onClick={this.changeState.bind(this)}
          />
        </div>
      </div>
    );
  }
}

const RightSide = props => {
  return (
    <div
      className="right-side"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
};

export default Mainpage;
