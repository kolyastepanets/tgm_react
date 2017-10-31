import React from 'react';
import Task from './Task.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as TaskActions from '../actions/taskActions';
import * as ServiceActions from '../actions/serviceActions';

class ListTasks extends React.Component {
  showForm() {
    this.props.actions.initializeTask({title: '', service: {}});
    $('#new-task').removeClass('hidden').animate({ 'right': '470px' }, 'slow' );
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
      <div>
        <button className='btn btn-demo new-task-btn' onClick={()=>{this.showForm()}} > New Task </button>
        <div className='task-lists'> {tasks} </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  tasksContainer: state.task,
  servicesContainer: state.service
});


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...TaskActions, ...ServiceActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ListTasks)
