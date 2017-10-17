import React from 'react';
import Task from './Task.jsx';
import NewTask from './NewTask.jsx';

export default class ListTasks extends React.Component {
  constructor(props) {
    super(props);

    this.deleteTask = this.deleteTask.bind(this);
  }

  deleteTask(id) {
    $.ajax({
      url: `/api/v1/tasks/${id}`,
      type: 'DELETE',
      success:() => {
        this.props.removeTaskFromArray(id);
      }
    });
  }

  showForm() {
    $('#new-task').removeClass('hidden');
  }

  render() {
    let tasks = this.props.tasks.map((task) => {
      return (
        <div key={task.id}>
          <Task task={task} handleDelete={this.deleteTask}/>
        </div>
      )
    })

    return(
      <div>
        <button className='btn btn-demo new-task-btn' onClick={this.showForm} > New Task </button>
        <div className='task-lists'> {tasks} </div>
        <NewTask />
      </div>
    )
  }
}
