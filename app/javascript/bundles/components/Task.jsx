import React from 'react';
import * as actions from '../actions/taskActions';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Task extends React.Component {
  handleDelete (id) {
    this.props.taskActions.removeTask(id);
  }

  handleEdit (task) {
    $('#new-task').removeClass('hidden').animate({ 'right': '470px' }, 'slow' );
    this.props.taskActions.editTask(task);
    this.addActiveClassToServiceType(task.service.classification);
    this.props.taskActions.loadServices(task.service.classification);
  }

  addActiveClassToServiceType(type) {
    $('.active-type-service').removeClass('active-type-service')
    $(`[data-type-name="${type}"] div`).addClass('active-type-service');
  }

  render() {
    let task = this.props.task;

    return (
      <div className='task'>
        <p className='task-held-at-time'>{task.created_at}</p>
        <p className='task_title'>{task.title}</p>
        <p className='task-run-btns'>
          <button className='btn btn-primary' onClick={this.handleEdit.bind(this, task)}>EDIT</button>
          <button className='btn btn-primary delete-task' onClick={this.handleDelete.bind(this, task.id)}>DELETE</button>
        </p>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  taskActions: bindActionCreators(actions, dispatch)
});

export default connect(null, mapDispatchToProps)(Task)
