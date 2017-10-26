import React from 'react';
import Task from './Task.jsx';

export default class ListTasks extends React.Component {
  showForm() {
    $('#new-task').removeClass('hidden');
  }

  render() {
    let tasks;

    // very strange if !!!
    if (this.props.tasks) {
      tasks = this.props.tasks.map((task) => {
        return (
          <div key={task.id}>
            <Task task={task} />
          </div>
        )
      })
    }

    return(
      <div>
        <button className='btn btn-demo new-task-btn' onClick={this.showForm} > New Task </button>
        <div className='task-lists'> {tasks} </div>
      </div>
    )
  }
}
