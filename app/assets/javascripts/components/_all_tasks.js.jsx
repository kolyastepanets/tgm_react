var AllTasks = React.createClass({
  getInitialState() {
    return { tasks: [] }
  },

  componentDidMount() {
    $.getJSON('/api/v1/tasks.json', (response) => { this.setState({ tasks: response }) });
  },

  render() {
    var tasks = this.state.tasks.map((task) => {
      return (
        <div key={task.id}>
          <h3>{task.title}</h3>
        </div>
      )
    });
    return( <div> {tasks} </div> )
  }
});
