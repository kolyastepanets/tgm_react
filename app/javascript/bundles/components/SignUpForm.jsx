import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actions from '../actions/authenticateActions';
import Toastr from 'toastr';
import { Link } from 'react-router';

class SignInForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      confirm_password: ''
    };

    this.redirect = this.redirect.bind(this);
  }

  redirect() {
    Toastr.success('Signed up');
    this.props.router.push('/');
  }

  handleChangeEmail(value) {
    this.setState({ email: value });
  }

  handleChangePassword(value) {
    this.setState({ password: value });
  }

  handleChangeConfirmPassword(value) {
    this.setState({ confirm_password: value });
  }

  signIn() {
    this.props.actions.signUp(this.state.email, this.state.password, this.state.confirm_password)
      .then(() => this.redirect())
      .catch(error => {
        Toastr.error(error);
      });
  }

  render() {
    return (
      <div className='tasks-lists-wrapper'>
        <input type="email"
               placeholder='Enter your email'
               className="form-control"
               onChange={(e) => this.handleChangeEmail(e.target.value)}/>
        <input type="password"
               placeholder='Enter your password'
               className="form-control"
               onChange={(e) => this.handleChangePassword(e.target.value)}/>
        <input type="password"
               placeholder='Confirm your password'
               className="form-control"
               onChange={(e) => this.handleChangeConfirmPassword(e.target.value)}/>
        <button className='btn btn-primary'
                onClick={()=>{this.signIn()}}>Sign Up</button>
        <Link to="#/signin"> Sign In</Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(null, mapDispatchToProps)(SignInForm)
