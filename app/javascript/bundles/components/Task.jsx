import React from 'react';
import * as actions from '../actions/taskActions';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Task extends React.Component {
  handleDelete (id) {
    this.props.pageActions.removeTask(id);
  }

  render() {
    let task = this.props.task;

    return (
      <div className='task'>
        <p className='task-held-at-time'>{task.created_at}</p>
        <p className='task_title'>{task.title}</p>
        <p className="task-run-btns">
          <button className='btn btn-primary'>EDIT</button>
          <button className='btn btn-primary delete-task' onClick={this.handleDelete.bind(this, task.id)}>DELETE</button>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({bla: state});

const mapDispatchToProps = (dispatch) => ({
  pageActions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Task)
