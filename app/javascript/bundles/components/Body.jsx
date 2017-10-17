import React from 'react';
import ListTasks from './ListTasks.jsx';
import NewTask from './NewTask.jsx';

export default class Body extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: []
    };
  }

  removeTaskFromArray = (id) => {
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

  handleSubmit = (task) => {
    var newState = this.state.tasks.concat(task);
    this.setState({ tasks: newState })
    $('#new-task').addClass('hidden');
  }

  render() {
    return (
      <div>
        <NewTask handleSubmit={this.handleSubmit}/>
        <ListTasks tasks={this.state.tasks} removeTaskFromArray={this.removeTaskFromArray}/>
      </div>
    )
  }
}
