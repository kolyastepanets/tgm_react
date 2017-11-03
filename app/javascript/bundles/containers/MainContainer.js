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
      <div className='main-container-wrapper'>
        { this.props.authContainer.loggedIn
            ? <ListTasks />
            : <SignInForm />
        }
        <FormTask />
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
