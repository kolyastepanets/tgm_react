import React from 'react';
import Task from './Task.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as TaskActions from '../actions/taskActions';
import * as ServiceActions from '../actions/serviceActions';
import $ from 'jquery';

class ListTasks extends React.Component {
  componentDidMount() {
    this.props.actions.loadTasks();
  }

  showForm() {
    this.props.actions.initializeTask({title: '', service: {}});
    this.props.actions.showForm();
  }

  render() {
    let tasks = this.props.tasksContainer.tasks.map((task) => {
      return (
        <div key={task.id}>
          <Task task={task} />
        </div>
      )
    })

    return(
      <div className='tasks-lists-wrapper'>
        <button className='btn btn-demo new-task-btn' onClick={()=>{this.showForm()}} > New Task </button>
        <div className='task-lists'> {tasks} </div>
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
  actions: bindActionCreators({ ...TaskActions, ...ServiceActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ListTasks)
