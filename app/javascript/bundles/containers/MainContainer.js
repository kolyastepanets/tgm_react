import React from 'react';
import { connect } from 'react-redux';
import ListTasks from '../components/ListTasks.jsx';
import FormTask from '../components/FormTask.jsx';
import { bindActionCreators } from 'redux'
import * as AuthActions from '../actions/authenticateActions';
import Toastr from 'toastr';

class Body extends React.Component {
  componentWillMount() {
    this.props.actions.validateToken();
  }

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

    new google.maps.Map(document.getElementById('map-container'), mapDefaultOptions);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut() {
    this.props.actions.signOut()
  }

  render() {
    return (
      <div className='component-wrapper'>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <span className="navbar-brand">JobUp</span>
            </div>
            <div>
              { (this.props.authContainer.loggedIn) &&
                <ul className='nav navbar-nav navbar-right'>
                  <a className="btn btn-danger" onClick={this.handleSignOut}>Sign Out</a>
                </ul>
              }
            </div>
          </div>
        </nav>
        <div id='map-container'></div>
        {this.props.children}
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
