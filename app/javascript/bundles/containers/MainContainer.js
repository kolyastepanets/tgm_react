import React from 'react';
import { connect } from 'react-redux';
import ListTasks from '../components/ListTasks.jsx';
import FormTask from '../components/FormTask.jsx';
import { bindActionCreators } from 'redux'
import * as TaskActions from '../actions/taskActions';
import * as ServiceActions from '../actions/serviceActions';

class Body extends React.Component {
  componentDidMount() {
    this.props.actions.loadTasks();
    this.props.actions.loadServiceTypes();
  }

  render() {
    return (
      <div className='main-container-wrapper'>
        <FormTask />
        <ListTasks />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...TaskActions, ...ServiceActions }, dispatch)
});

export default connect(null, mapDispatchToProps)(Body)
