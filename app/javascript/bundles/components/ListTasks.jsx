import React from 'react';
import Task from './Task.jsx';
import NewTask from './NewTask.jsx';

export default class ListTasks extends React.Component {
  constructor(props) {
    super(props);

    this.deleteTask = this.deleteTask.bind(this);
    this.addTaskToArray = this.addTaskToArray.bind(this);

    this.state = {
      tasks: []
    };
  }

  deleteTask(id) {
    $.ajax({
      url: `/api/v1/tasks/${id}`,
      type: 'DELETE',
      success:() => {
        this.removeTaskFromArray(id);
      }
    });
  }

  addTaskToArray(task) {
    this.state.tasks.push(task)
  }

  removeTaskFromArray(id) {
    let newTasks = this.state.tasks.filter((task) => {
      return task.id != id;
    });
    this.setState({ tasks: newTasks });
  }

  componentDidMount() {
    $.getJSON('/api/v1/tasks.json', (response) => {
      this.setState({ tasks: response })
    })
  }

  showForm() {
    $('#new-task').removeClass('hidden');
    // $('#task-services').html("<%= j (render(partial: 'services', locals: { id: '' })) %>");
    // $('#new-task').animate({ "right": "470px" }, "slow" )
  }

  render() {
    let tasks = this.state.tasks.map((task) => {
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
        <NewTask services={this.state.services} handleAdd={this.addTaskToArray} />
      </div>
    )
  }
}
