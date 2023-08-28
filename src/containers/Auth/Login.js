import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
// import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import './Login.scss';
import { handeLoginApi } from '../../services/userServices'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEyeDropperEmpty } from '@fortawesome/free-solid-svg-icons'
import { userLoginSuccess } from '../../store/actions/userActions'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errMessage: '',
            showPassword: false
        }
    }


    handleUserNameLogin = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    handlePasswordLogin = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    

    handleSubmitLogin = async () => {
        try {
            this.setState({
                errMessage: ''
            })
            let data = await handeLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {          
                    this.setState({
                        errMessage: data.message
                    })
            }
            if (data && data.errCode === 0) {
                //this.props là truyền dữ liệu        
                this.props.userLoginSuccess(data.user);
            }

        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data.message
                    })
                }
            }
        }
    }

    handleShowPassword = (e) => {
        this.setState({
            showPassword: !this.state.showPassword
        })

    }

    render() {
        window.onkeydown =(e) => {
         if(e.which === 13) {
            this.handleSubmitLogin();
         }
        }
        
        return (
            <React.Fragment>
                <div class="login-box">
                    <h2>Login</h2>
                    <form>
                        <div class="user-box login_input">
                            <input type="text"
                                required
                                value={this.state.username}
                                onChange={(e) => this.handleUserNameLogin(e)}
                            />
                            <label>Username</label>
                        </div>
                        <div class="user-box login_input">
                            <input
                                type={this.state.showPassword ? 'text' : 'password'}
                                className='Input_control'
                                value={this.state.password}
                                onChange={(event) => this.handlePasswordLogin(event)}
                                required />
                            <div className='Icon_Eye-login' onClick={(e) => this.handleShowPassword(e)}>
                                {this.state.showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEyeDropperEmpty} />}

                            </div>
                            <label>Password</label>
                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>

                        <div className='Login_forgotPassword'>
                            Forgot password ?
                        </div>
                        <a href="#" onClick={(e) => this.handleSubmitLogin(e)}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Submit
                        </a>

                    </form>
                </div>
            </React.Fragment>


        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: userInfo => dispatch(actions.userLoginSuccess(userInfo)),
    };


};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
