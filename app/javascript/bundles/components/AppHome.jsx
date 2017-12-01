import React from 'react';
import { connect } from 'react-redux';
import ListTasks from '../components/ListTasks';
import FormTask from '../components/FormTask';
import { bindActionCreators } from 'redux'
import * as AuthActions from '../actions/authenticateActions';

class Body extends React.Component {
  render() {
    return (
      <div>
        <ListTasks />
        { this.props.tasksContainer.showForm && <FormTask />}
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
