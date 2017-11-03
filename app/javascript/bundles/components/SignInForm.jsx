import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actions from '../actions/authenticateActions';

class SignInForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  handleChangeEmail(value) {
    this.setState({ email: value });
  }

  handleChangePassword(value) {
    this.setState({ password: value });
  }

  signIn() {
    this.props.actions.signIn(this.state.email, this.state.password);
  }

  render() {
    return (
      <div className='tasks-lists-wrapper'>
        <input type="email"
             placeholder='Enter your email'
             onChange={(e) => this.handleChangeEmail(e.target.value)}/>
        <input type="password"
             placeholder='Enter your password'
             onChange={(e) => this.handleChangePassword(e.target.value)}/>
        <button className='btn btn-primary'
                onClick={()=>{this.signIn()}}>Sign In</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(null, mapDispatchToProps)(SignInForm)
