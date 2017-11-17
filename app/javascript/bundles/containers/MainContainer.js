import React from 'react';
import { connect } from 'react-redux';
import ListTasks from '../components/ListTasks.jsx';
import FormTask from '../components/FormTask.jsx';
import SignInForm from '../components/SignInForm.jsx';
import { bindActionCreators } from 'redux'
import * as AuthActions from '../actions/authenticateActions';

class Body extends React.Component {
  componentDidMount() {
    let mapDefaultOptions = {
      zoom: 15,
      center: {
        lat: 48.463819,
        lng: 35.053189
      },
      streetViewControl: false,
      mapTypeControl: false
    }

    new google.maps.Map(document.getElementById('map-container'), mapDefaultOptions)
    this.props.actions.validateToken();
  }

  render() {
    return (
      <div className='component-wrapper'>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <span className="navbar-brand">JobUp</span>
            </div>
          </div>
        </nav>
        <div className='main-container-wrapper'>
          { this.props.authContainer.loggedIn
              ? <ListTasks />
              : <SignInForm />
          }
          <FormTask />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  tasksContainer: state.task,
  servicesContainer: state.service,
  authContainer: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...AuthActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Body)
