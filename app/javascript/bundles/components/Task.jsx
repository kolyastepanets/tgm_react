import React from 'react';
import * as TaskActions from '../actions/taskActions';
import * as ServiceActions from '../actions/serviceActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Task extends React.Component {
  handleDelete (id) {
    this.props.actions.removeTask(id);
  }

  handleEdit (task) {
    this.props.actions.showForm();
    this.props.actions.initializeTask(task);
    this.props.actions.loadServices(task.service.classification);
  }

  render() {
    let task = this.props.task;

    return (
      <div className='task'>
        <p className='task-held-at-time'>{task.created_at}</p>
        <p className='task_title'>{task.title}</p>
        <p className='task-run-btns'>
          <button className='btn btn-primary' onClick={this.handleEdit.bind(this, task)}>EDIT</button>
          <button className='btn btn-primary delete-task'
                  onClick={this.handleDelete.bind(this, task.id)}>DELETE</button>
        </p>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...TaskActions, ...ServiceActions }, dispatch)
});

export default connect(null, mapDispatchToProps)(Task)
