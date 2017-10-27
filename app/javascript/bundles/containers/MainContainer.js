import React from 'react';
import { connect } from 'react-redux';
import ListTasks from '../components/ListTasks.jsx';
import FormTask from '../components/FormTask.jsx';
import * as actions from '../actions/taskActions';

const mapStateToProps = (state) => ({
  tasks: state.tasks,
  task: state.task,
  services: state.services,
  serviceTypes: state.serviceTypes
});

class Body extends React.Component {
  componentDidMount() {
    this.props.loadTasks();
    this.props.loadServiceTypes();
  }

  render() {
    return (
      <div>
        <FormTask task={this.props.task} serviceTypes={this.props.serviceTypes} services={this.props.services}/>
        <ListTasks tasks={this.props.tasks} />
      </div>
    )
  }
}

export default connect(mapStateToProps, actions)(Body);
